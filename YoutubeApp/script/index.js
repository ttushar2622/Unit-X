const API_KEY=`AIzaSyBul6STM0RG5HOJZei3VctEb6flPSwdGLE`;

const container_div = document.getElementById("container")
const searchVideos = async()=>{
   
    try{
        const query = document.getElementById("query").value;
          const res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${API_KEY}`);

          const data = await res.json();

          const actual_data = data.items;
          appendVideos(actual_data);
    }
    catch(err){
        console.log(err);
    }
}


const appendVideos= (data)=>{
     container_div.innerHTML=null;
    data.forEach( ( {snippet, id:{videoId}} )=> {
        
        const title = snippet.title;

        

        const thumbnail  = snippet.thumbnails.high.url;

        const channel_name = snippet.channelTitle;

        const div =document.createElement('div');

        const img = document.createElement('img');

        img.src=thumbnail;

        const title_html = document.createElement('h4');
        title_html.innerText=title;

        const channel_html=document.createElement('h4');
        channel_html.innerText=channel_name;

        let data ={

            videoId,
            snippet,
        };


        div.onclick = ()=>{

           storeClickedVideo(data)
        }

        div.append(img,title,channel_html);

        container_div.append(div);




    });
}


function  storeClickedVideo(data){
    
    
    localStorage.setItem('clicked_item',JSON.stringify(data));
    window.location.href='video.html';
    
    // console.log(data)
}