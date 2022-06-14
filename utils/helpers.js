module.exports = {
    format_date: date => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
        date
      ).getFullYear()}`;
    },
    format_plural: (word, amount) => {
        if (amount !== 1) {
          return `${word}s`;
        }
    
        return word;
      },
      format_url: url => {
        return url
          .replace('http://', '')
        //   but we need to account for some other cases. What about URLs with much more after the domain? We could write a large switch statement, or a few if-else statements, but luckily, replace() returns the modified string. This means that we can just chain the methods as shown in the following code:
          .replace('https://', '')
          .replace('www.', '')
          .split('/')[0]
          .split('?')[0];
      },
  }
  