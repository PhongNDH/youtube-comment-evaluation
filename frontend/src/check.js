import axios from "axios";
import cheerio from 'cheerio';


export const validateYouTubeUrl = (url) => {
    if (url !== undefined || url !== "") {
        var regExp =
            /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[2].length === 11) {
            // Do anything for being valid
            // if need to change the url to embed url then use below line
            //$('#videoObject').attr('src', 'https://www.youtube.com/embed/' + match[2] + '?autoplay=1&enablejsapi=1');
            return true;
        } else {
            return false;
        }
    }
};

export const youtubeJson = async (url) => {
    try {
        const response = await axios.get(url);
        const html = response;
        // Process the HTML content here
        extractData(html);
        return html;
    } catch (error) {
        return error;
    }
};

const extractData = (html) => {
    const $ = cheerio.load(html);
  
    // Use selectors to target specific elements and extract data
    const title = $('h1').text();
    const paragraphs = $('p').map((index, element) => $(element).text()).get();
  
    // Process and store the extracted data as needed
    console.log('Title:', title);
    console.log('Paragraphs:', paragraphs);
  };
