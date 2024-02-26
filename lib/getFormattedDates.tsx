export default function getFormattedDate(dateString: string):string {
    return new Intl.DateTimeFormat('en-US',{dateStyle: 'long'}).format(new Date(dateString))
};

//Here, the Intl.DateTimeFormat is a constructor of International API
//That constructor formats object for "en-US" locale
//dateStyle:'long' will give a string with long form representation of the date.
//the next dot notation will give string like "February 24,2024" 