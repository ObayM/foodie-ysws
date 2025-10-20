"use client";
import React, { useState, useEffect } from 'react';

import './loading.css'; 

const createSignal = (initialValue) => {
  let _value = initialValue;

  const subscribers = new Set();

  const signal = {
    subscribe(callback) {
      subscribers.add(callback);
      return () => subscribers.delete(callback);
    },
    get value() { return _value; },
    set value(newValue) {
      if (_value !== newValue) {
        _value = newValue;
        subscribers.forEach(cb => cb());
      }
    },
  };

  return signal;
};

const useSignal = (signal) => {
  const [value, setValue] = useState(signal.value);
  useEffect(() => {

    const unsubscribe = signal.subscribe(() => setValue(signal.value));
    return unsubscribe;

  }, [signal]);

  return value;
};

const SignalLoader = ({ progressSignal, messageSignal }) => {
  const progress = useSignal(progressSignal);

  const message = useSignal(messageSignal);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black font-mono">
      <div className="scanlines relative w-11/12 max-w-lg p-8 text-center overflow-hidden">

        <div className="glitch-text mb-6 text-lg font-bold tracking-widest text-cyan-400" data-text={message}>
          {message}
        </div>

        <div className="w-full h-2 mb-2 bg-cyan-900/50 border border-cyan-400/30">
          
          <div
            className="h-full bg-cyan-400 shadow-[0_0_10px_theme(colors.cyan.400)] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          >

          </div>

        </div>
        <div className="text-sm text-cyan-400">{Math.round(progress)}%</div>

      </div>
    </div>
  );
};

const isLoading = createSignal(true);

const progress = createSignal(0);

const message = createSignal("INITIALIZING...");


const simulateTransmission = async () => {
  
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  await sleep(1000);
  message.value = "SIGNAL INCOMING...";
  progress.value = 0;

  await sleep(1500);
  progress.value = 15;
  message.value = "ANALYZING FREQUENCY...";

  await sleep(1200);
  progress.value = 40;
  message.value = "DECRYPTING TRANSMISSION...";

  await sleep(2000);
  progress.value = 75;
  message.value = "RENDERING DATASTREAM...";

  await sleep(1500);
  progress.value = 100;
  message.value = "SIGNAL RECEIVED.";

  await sleep(1200);
  isLoading.value = false;
};


export default function LoadingScreen({ children }) {
  const showLoader = useSignal(isLoading);

  useEffect(() => {
    simulateTransmission();
  }, []);

  return (
    <>
      {showLoader ? (
        <SignalLoader progressSignal={progress} messageSignal={message} />
      ) : (
        <>{children}</>
      )}
    </>
  );
}