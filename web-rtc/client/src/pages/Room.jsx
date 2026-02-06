import { useEffect, useCallback, useState, useRef } from "react";
import { useSocket } from "../providers/Socket";
import { usePeer } from "../providers/Peer";

const Room = () => {
  const { socket } = useSocket();
  const {
    peer,
    createOffer,
    createAnswer,
    setRemoteAnswer,
    sendStream,
    remoteStream,
  } = usePeer();
  const [myStream, setMyStream] = useState(null);
  const [mediaError, setMediaError] = useState("");
  const [remoteEmailId, setRemoteEmailId] = useState("");
  const myVideoRef = useRef(null);

  const handleNewUserJoined = useCallback(
    async ({ emailId }) => {
      const offer = await createOffer();
      socket.emit("call-user", { emailId, offer });
      setRemoteEmailId(emailId);
    },
    [createOffer, socket],
  );

  const handleIncomingCall = useCallback(
    async ({ from, offer }) => {
      const ans = await createAnswer(offer);
      socket.emit("call-accepted", { emailId: from, ans });
      setRemoteEmailId(from);
    },
    [createAnswer, socket],
  );

  const handleCallAccepted = useCallback(
    async ({ ans }) => {
      console.log("Call accepted, setting remote answer");
      await setRemoteAnswer(ans);
    },
    [setRemoteAnswer],
  );

  const getUserMediaStream = useCallback(async () => {
    setMediaError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setMyStream(stream);
    } catch (error) {
      const message =
        error?.name === "NotReadableError"
          ? "Camera is already in use by another app or browser tab."
          : "Unable to access camera/microphone.";
      setMediaError(message);
      setMyStream(null);
      console.error("getUserMedia error:", error);
    }
  }, []);

  const handleNegosiation = useCallback(() => {
    const localOffer = peer.localDescription;
    socket.emit("call-user", { emailId: remoteEmailId, offer: localOffer });
  }, [peer, socket, remoteEmailId]);

  useEffect(() => {
    socket.on("user-joined", handleNewUserJoined);
    socket.on("incoming-call", handleIncomingCall);
    socket.on("call-accepted", handleCallAccepted);

    return () => {
      socket.off("user-joined", handleNewUserJoined);
      socket.off("incoming-call", handleIncomingCall);
      socket.off("call-accepted", handleCallAccepted);
    };
  }, [socket, handleNewUserJoined, handleIncomingCall, handleCallAccepted]);

  useEffect(() => {
    peer.addEventListener("negotiationneeded", handleNegosiation);

    return () => {
      peer.removeEventListener("negotiationneeded", handleNegosiation);
    };
  });

  useEffect(() => {
    getUserMediaStream();
  }, [getUserMediaStream]);

  useEffect(() => {
    if (myStream && myVideoRef.current) {
      myVideoRef.current.srcObject = myStream;
    }
  }, [myStream]);

  useEffect(() => {
    return () => {
      if (myStream) {
        myStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [myStream]);

  return (
    <div>
      <h1>Room</h1>
      <h4>You are connected to {remoteEmailId}</h4>
      <button onClick={() => sendStream(myStream)} disabled={!myStream}>
        Send My Video
      </button>
      {mediaError && <p>{mediaError}</p>}
      {myStream && (
        <video
          ref={myVideoRef}
          autoPlay
          playsInline
          muted
          style={{ width: "400px", border: "2px solid black" }}
        />
      )}

      {remoteStream && (
        <video
          ref={(video) => {
            if (video) {
              video.srcObject = remoteStream;
            }
          }}
          autoPlay
          playsInline
          style={{ width: "400px", border: "2px solid red" }}
        />
      )}
    </div>
  );
};

export default Room;
