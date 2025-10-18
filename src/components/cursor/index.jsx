'use client'
import React, { useState, useEffect, useRef } from 'react';
import './cursor.css';

const FOOD_EMOJIS = ['🍕', '🍔', '🍣', '🌮', '🍜', '🍩', '🍦', '🍪', '🍉', '🍓'];
const EMOJI_CHANGE_INTERVAL = 5000;
const TRAIL_ANIMATION_DURATION = 800; 
const TRAIL_THROTTLE_DELAY = 50;

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currentEmojiIndex, setCurrentEmojiIndex] = useState(0);
  const [trails, setTrails] = useState([]);
  const [isHidden, setIsHidden] = useState(true);

  const lastTrailTime = useRef(0);
  const emojiRef = useRef(FOOD_EMOJIS[currentEmojiIndex]);

  useEffect(() => {
    emojiRef.current = FOOD_EMOJIS[currentEmojiIndex];
  }, [currentEmojiIndex]);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentEmojiIndex((prevIndex) => (prevIndex + 1) % FOOD_EMOJIS.length);
    }, EMOJI_CHANGE_INTERVAL);

    return () => clearInterval(intervalId); 
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {

      if (isHidden) {
        setIsHidden(false);
      }
      
      const newPosition = { x: e.clientX, y: e.clientY };
      setPosition(newPosition);

      const now = Date.now();

      if (now - lastTrailTime.current > TRAIL_THROTTLE_DELAY) {
        lastTrailTime.current = now;

        const newTrail = {
          id: now,
          ...newPosition,
          emoji: emojiRef.current,

        };

        setTrails((prevTrails) => [...prevTrails, newTrail]);


        setTimeout(() => {
          setTrails((prev) => prev.filter((trail) => trail.id !== newTrail.id));
        }, TRAIL_ANIMATION_DURATION);
      }
    };
    
    const handleMouseLeave = () => {
        setIsHidden(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isHidden]); 

  return (
    <>
      <div
        className={`food-cursor fixed -translate-1/2 text-4xl z-10 pointer-events-none opacity-100 ${isHidden ? 'hidden' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <span className="food-cursor-emoji">{FOOD_EMOJIS[currentEmojiIndex]}</span>
      </div>

      {trails.map((trail) => (
        <div
          key={trail.id}
          className="fixed -translate-1/2 text-3xl z-10 pointer-events-none food-trail"
          style={{
            left: `${trail.x}px`,
            top: `${trail.y}px`,
          }}
        >
          {trail.emoji}
        </div>
      ))}
    </>
  );
};

export default CustomCursor;