import { useEffect, useCallback } from "react";
import { useSocket } from "../providers/Socket";
import { usePeer } from "../providers/Peer";

const Room = () => {
  const { socket } = useSocket();
  const { peer, createOffer, createAnswer, setRemoteAnswer } = usePeer();

  const handleNewUserJoined = useCallback(
    async ({ emailId }) => {
      const offer = await createOffer();
      socket.emit("call-user", { emailId, offer });
    },
    [createOffer, socket],
  );

  const handleIncomingCall = useCallback(
    async ({ from, offer }) => {
      const ans = await createAnswer(offer);
      socket.emit("call-accepted", { emailId: from, ans });
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

  return <div>Room</div>;
};

export default Room;
