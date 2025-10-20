import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center gap-y-4">
          
          <div className="flex items-center text-blue-950 text-lg">
            Made with
            <span className="relative inline-block mx-2">
              <Heart className="w-6 h-6 text-red-500 fill-current animate-[heartbeat_1.5s_ease-in-out_infinite]" />
            </span>
            by
            <a
              href="https://github.com/obayM"
              target="_blank"
              className="ml-2  text-red-900 transition-colors duration-300 hover:text-transparent bg-clip-text hover:bg-gradient-to-r from-blue-900 to-blue-950"
            >
              Obay
            </a>
          </div>
          
          <p className="text-sm text-gray-950 text-center">
            Need help? Check out the{' '}
            <a
              href="https://hackclub.slack.com/archives/C09DLGM81E1" 
              target="_blank"
              className=" transition-colors duration-300 hover:text-blue-950 hover:underline"
            >
              #foodie channel on Slack
            </a>.
          </p>

        </div>
      </div>

    </footer>
  );
}