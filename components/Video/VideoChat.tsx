"use client";
import React, { useState,useEffect } from "react";
import { useSocketContext } from "@/context/SocketContext";
import { Assignment, Phone, PhoneDisabled } from "@mui/icons-material";
import CopyToClipboard from "react-copy-to-clipboard";
import { Grid, Typography, Paper } from '@mui/material';
type VideoChatProps = {};
const VideoChat: React.FC<VideoChatProps> = () => {
  const { me,name, callAccepted, myVideo, userVideo, callEnded, answerCall,stream, call,callUser,leaveCall,setName } =useSocketContext();
  const [idToCall, setIdToCall] = useState("");
  useEffect(() => {
    // Set the srcObject of myVideo when stream changes
    if (myVideo.current && stream) {
      myVideo.current.srcObject = stream;
    }
   
     // Clear the video elements when the call ends
     if (callEnded) {
      if (myVideo.current) {
        myVideo.current.srcObject = null;
      }
      if (userVideo.current) {
        userVideo.current.srcObject = null;
      }
    }
    
  }, [stream, myVideo,userVideo,callEnded]);

  return (
   <> <Grid container className="">
    {stream && !callEnded  && (
      <Paper className="">
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
          <video playsInline muted ref={myVideo} autoPlay className="w-[500px] h-[500px] " />
        </Grid>
      </Paper>
    )}
    {callAccepted && !callEnded &&  (
      <Paper className="">
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>{call.from === me ? 'You' : call.name}</Typography>
          <video playsInline ref={userVideo} autoPlay className="w-[500px] h-[500px] "/>
        </Grid>
      </Paper>
    )}
  </Grid>
      <div>
      Options
      <form action="" autoComplete="off" noValidate className="flex flex-col justify-center items-start gap-5">
        <div>
          <label htmlFor="Name">Account Info </label>
          <textarea
            name="Name"
            id="Name"
            value={name}
            className="bg-gray-400"
            onChange={(e) => setName(e.target.value)}
          ></textarea>
           
          <CopyToClipboard text={me}>
            <p className="w-full text-lg"><Assignment/> Copy Your ID </p>
          </CopyToClipboard>
        </div>
        <div>
          <label htmlFor="Call">Make a Call  </label>
          <textarea
            name="Call"
            id="Call"
            value={idToCall}
            className="bg-gray-400"
            onChange={(e) => setIdToCall(e.target.value)}
          ></textarea>
          {callAccepted && !callEnded ? (
            <p className="w-full text-lg cursor-pointer bg-gray-400" onClick={leaveCall}><PhoneDisabled/> Hang up </p>
          ) : (
            <p className="w-full text-lg cursor-pointer bg-gray-400" onClick={()=>callUser(idToCall, name)}><Phone /> Call </p>
          )}
        </div>
      </form>
      {call.isReceivingCall && !callAccepted && (
        <div className='flex justify-center'>
            <h1>{call.name} is calling.</h1>
            <p onClick={answerCall} className='w-fit bg-gray-400 cursor-pointer'>Answer</p>
        </div>
      )}
    </div>
        
          </>
  );
};
export default VideoChat;
