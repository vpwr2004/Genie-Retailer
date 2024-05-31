
export const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const timeOptions = { hour: 'numeric', minute: 'numeric' };
    const dateFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };

    // Format time
    const formattedTime = date.toLocaleTimeString('en-US', timeOptions);

    // Format date
    const formattedDate = date.toLocaleDateString('en-US', dateFormatOptions);
    // console.log(formattedDate,formattedTime)

    return { formattedTime, formattedDate };
};