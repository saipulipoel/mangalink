    const main_url = {
        mangadex: ["https://mangadex.org/title/"],
        batoto: [
                    "https://bato.to/",
                    "https://bato.si/",
                    "https://zbato.org/",
                    "https://zbato.net/",
                    "https://mto.to/",
                    "https://batotwo.com/",
                    "https://xbato.org/",
                    "https://comiko.org/"
                ]
    }
    
    
    document.addEventListener('DOMContentLoaded', function() {
    // Your code to run after the DOM is ready
    var datalink_json = undefined


    fetch('https://github.com/saipulipoel/mangalink/blob/main/data.json')
      .then(response => response.json())
      .then(data => {
        datalink_json = data
      })
      .catch(error => {
        console.error('Error fetching JSON:', error);
      });
    html = ""
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('title');

    if (Object.hasOwn(datalink_json, title)) {
        const sites = datalink_json[title];
        
        for (const site_name in sites) {


            const site_data = sites[site_name];
            
            for (const url of main_url[site_name]) {
                html += `<a class="link" href="${url + site_data}" target="_blank">
                    <i class="fab fa-external-link">&nbsp;</i>${url + site_data}
                </a>`
            }
        }
    }
    else{
        html += `<a class="link" href="https://www.facebook.com/pantectranslation" target="_blank">
                    <i class="fab fa-facebook">&nbsp;</i>Link tidak ditemukan, kembali ke facebook
                </a>`
    }


    // html = `<a class="link" href="https://github.com/johnggli" target="_blank">
    //     <i class="fab fa-github">&nbsp;</i>Github
    //   </a>`
    linkdiv = document.getElementById("links")
    linkdiv.innerHTML = html
    });