'use strict';

const hostname = location.host;
// console.log(hostname);  Can be used to find the hostname.

// activate direct link when visitig Google Drive
switch(hostname) {
    case 'drive.google.com':
       handleDrive();
        break;        
    default:
        break;   
}


function handleDrive() {
    window.setInterval(() => {
     let frame = Array.from(document.getElementsByTagName('iframe')).find((x) => x.src.includes('/sharing/driveshare'));
    
        if(!frame) return; 
        if(frame.contentDocument.querySelectorAll('h2').length != 4) return; 

        let title = frame.contentDocument.querySelectorAll('h2')[3];
        let url = Array.from(frame.contentDocument.querySelectorAll('input[type="text"]')).find((x) => x.value.includes('drive.google.com'))

        if(!url) return; 

        url = url.value;

        let fid = url.match(/https:\/\/drive.google\.com\/file\/d\/(.*)\/view(.*)/)[1];
        
        let downloadLink = 'https://drive.google.com/uc?id=' + fid ;

        if(title.innerHTML.includes('Direct link to photo')) return; 

        title.innerHTML = title.innerHTML + '<a href="' + downloadLink + ' "target="_blank"" " style="font-size: 0.8rem; margin-left: 20px; target-new: window" >Direct link to photo</a>'

    }, 1000)
}

