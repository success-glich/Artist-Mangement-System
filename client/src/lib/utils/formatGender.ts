export const formatGender = (gender: string): string => {
    const genderMap: { [key: string]: string } = {
        'f': 'Female',
        'm': 'Male',
        'o': 'Other'
    };
    return genderMap[gender.toLowerCase()] || 'Unknown';
};
