import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { PowerUp } from '../types';
import { soundEffects } from '../utils/audio';

interface PowerUpPanelProps {
  powerUps: PowerUp[];
  onUsePowerUp: (id: PowerUp['id']) => void;
  disabled?: boolean;
}

export const PowerUpPanel: React.FC<PowerUpPanelProps> = ({
  powerUps,
  onUsePowerUp,
  disabled = false,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-4 bg-white border-4 border-black p-3.5 sm:p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-black">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5 text-xs font-black text-black tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-black" />
          YOUR POWER-UP VAULT
        </div>
        <span className="text-[11px] font-bold text-gray-600 uppercase">
          Click power-up to activate
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {powerUps.map((pu) => {
          const isUsable = pu.count > 0 && !pu.isActive && !disabled;

          return (
            <motion.button
              key={pu.id}
              id={`btn-powerup-${pu.id}`}
              disabled={!isUsable}
              onClick={() => {
                soundEffects.playPowerUp();
                onUsePowerUp(pu.id);
              }}
              whileHover={isUsable ? { scale: 1.02 } : {}}
              whileTap={isUsable ? { scale: 0.98 } : {}}
              className={`relative flex items-center gap-2 p-2.5 border-2 border-black text-left transition-all ${
                pu.isActive
                  ? 'bg-pink-400 text-black ring-2 ring-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                  : pu.count > 0
                  ? 'bg-yellow-200 hover:bg-yellow-300 text-black cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5'
                  : 'bg-gray-100 border-gray-400 text-gray-400 cursor-not-allowed opacity-60'
              }`}
            >
              <div className="text-xl sm:text-2xl flex-shrink-0">
                {pu.icon}
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-xs font-black truncate uppercase text-black">
                  {pu.name}
                </div>
                <div className="text-[10px] font-bold text-gray-700 truncate uppercase">
                  {pu.isActive ? 'ACTIVE!' : `${pu.count} in bag`}
                </div>
              </div>

              {/* Count Badge */}
              <div className={`px-1.5 py-0.5 border border-black text-[10px] font-black uppercase ${
                pu.isActive
                  ? 'bg-black text-yellow-300'
                  : pu.count > 0
                  ? 'bg-white text-black'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {pu.isActive ? '✓' : `x${pu.count}`}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

