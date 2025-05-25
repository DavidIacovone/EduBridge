export const getSubjectIcon = (subject: string) => {
    const icons: Record<string, string> = {
        Mathematics: 'calculator-variant',
        Physics: 'atom',
        Chemistry: 'flask-outline',
        Biology: 'leaf',
        ComputerScience: 'laptop',
        English: 'book-open-variant',
        History: 'timeline-clock',
        Geography: 'earth',
        Art: 'palette',
        Music: 'music-note',
        Economics: 'chart-line',
        Psychology: 'brain',
    };

    return icons[subject] || 'help-circle';
};
