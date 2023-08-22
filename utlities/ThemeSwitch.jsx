"use client";

import { useTheme } from "next-themes";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="inline-flex items-center">
      <select
        name="themeSwitch"
        value={theme}
        id="themeSwitch"
        onChange={(e) => setTheme(e.target.value)}
        className="block w-32 rounded-lg border border-gray-300 bg-gray-50 p-2 text-base
         text-gray-900 focus:border-blue-500
        focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700
        dark:text-white dark:placeholder-gray-400
        dark:focus:border-blue-500 dark:focus:ring-blue-500"
      >
        <option value="system">System</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
    </div>
  );
};

export default ThemeSwitch;
