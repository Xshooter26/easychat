import React from 'react'
import { LucideMessagesSquare, MessageCircleIcon, MessageCircleOff, MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center
     justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 bg-primary/10 flex items-center rounded-full
             justify-center animate-bounce"
            >
              <LucideMessagesSquare className="w-8 h-8 text-pink-700"/>
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Welcome to EasyChat</h2>
        <p className="text-base-content/60">
          Select a conversation to start chatting...
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;