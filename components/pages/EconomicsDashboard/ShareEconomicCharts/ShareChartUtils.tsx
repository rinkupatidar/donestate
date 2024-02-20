export const shareToFacebook = (imgUrl: string, title: string, desc: string) => {
  const facebookShareURL = `https://www.facebook.com/sharer/sharer.php/?u=${encodeURIComponent(getSharedServerURL(imgUrl, title, desc))}`;
  // Check if window.open is available
  if (window.open) {
    console.log(facebookShareURL);
    window.open(facebookShareURL, '_blank');
  } else {
    console.error('Error: Unable to open window for Facebook share.');
  }
}

export const shareToTwitter = (url: string, title: string, desc: string) => {
  axios
   .get('http://share.donestat.co/', {
	 params: {
      title: title,
      description: desc,
      image:url,
     }
   })
    .then((response) => {
      // const cheerio = require('cheerio');
      // const $ = cheerio.load(response.data);
      // const ogTitle = $('meta[name="twitter:title"]').attr('content');
      // const ogDescription = $('meta[name="twitter:description"]').attr('content');
      // const ogImage = $('meta[property="og:image"]').attr('content');
     const URL = 'https://donestat.netlify.app/test'
      const twitterShareURL = `https://twitter.com/intent/tweet?url=${URL}&via=${encodeURI(title)}&text=${encodeURI(desc)}&source=${encodeURI(url)}'`;
      window.open(twitterShareURL, '_blank');
    })
    .catch((error) => {
      console.error('Error', error);
    });
};

export const shareToLInkdin = (url: string, title: string, desc: string) => {
  // const image ='https://st5.depositphotos.com/3500059/62676/i/1600/depositphotos_626766706-stock-photo-word-example-written-red-pad.jpg';
  const shareUrlTo = `https://donestat.co/&title=${title}&summary=${desc}&source=${url}`;
     window.open(
    `https://www.linkedin.com/shareArticle/?url=${shareUrlTo}`
  )
}

const getSharedServerURL = (imgUrl: string, title: string, desc: string): string => {
  return `https://share.donestat.co/?title=${title}&description=${desc}&image=${imgUrl}`;
};




