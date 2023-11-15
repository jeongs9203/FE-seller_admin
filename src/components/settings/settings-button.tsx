'use client';

import { useEffect, useState } from 'react';
import cn from '@/utils/class-names';
import CogSolidIcon from '@/components/icons/cog-solid';
import { ActionIcon } from '@/components/ui/action-icon';
import { presetDark, presetLight, usePresets } from '@/config/color-presets';
import { useApplyColorPreset, useColorPresetName, useColorPresets } from '@/hooks/use-theme-color';
import { useTheme } from 'next-themes';
import { updateThemeColor } from '@/utils/update-theme-color';
import { PiMoon, PiSun } from 'react-icons/pi';

export default function SettingsButton({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const COLOR_PRESETS = usePresets();
  const [ isDark, setIsDark ] = useState<boolean>(false)
  const { theme, setTheme } = useTheme();
  const { colorPresets } = useColorPresets();
  const { colorPresetName } = useColorPresetName();

  useApplyColorPreset<any>(colorPresets ?? COLOR_PRESETS[0].colors);

  const changeDarkmode = () => {
    setIsDark(!isDark)
    if ( theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  useEffect(() => {
    if (theme === 'light' && colorPresetName === 'black') {
      updateThemeColor(
        presetLight.lighter,
        presetLight.light,
        presetLight.default,
        presetLight.dark
      );
    }
    if (theme === 'dark' && colorPresetName === 'black') {
      updateThemeColor(
        presetDark.lighter,
        presetDark.light,
        presetDark.default,
        presetDark.dark
      );
    }
  }, [theme, colorPresetName]);

  return (
    <ActionIcon
      aria-label="Settings"
      variant="text"
      className={cn(
        'relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9',
        className
      )}
      onClick={changeDarkmode}
     >
      {
        isDark ? <PiSun className="h-[22px] w-[22px] animate-spin-slow" /> : <PiMoon className="h-[22px] w-[22px] animate-bounce" />
      }
    </ActionIcon>
  );
}
