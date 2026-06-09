function ScheduleStyles() {
  return (
    <style>
      {`
        .schedule-native-scrollbar-hidden {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .schedule-native-scrollbar-hidden::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
      `}
    </style>
  );
}

export default ScheduleStyles;
