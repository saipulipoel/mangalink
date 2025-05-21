const main_url = {
    mangadex: ["https://mangadex.org/title/"],
    batoto: [
        "https://bato.to/title/",
        "https://bato.si/title/",
        "https://zbato.org/title/",
        "https://zbato.net/title/",
        "https://mto.to/title/",
        "https://batotwo.com/title/",
        "https://xbato.org/title/",
        "https://comiko.org/title/"
    ]
}

document.addEventListener('DOMContentLoaded', function () {
    let datalink_json = {};

    fetch('https://raw.githubusercontent.com/saipulipoel/mangalink/main/data.json')
    // fetch('data.json', { mode: 'no-cors'})
        .then(response => response.json())
        .then(data => {
            datalink_json = data;

            let html = "";
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');
            const mirror_title = document.getElementById("idxu");
            const garapandiv = document.getElementById("garapan")

            if (Object.hasOwn(datalink_json, id)) {
                const sites_data = datalink_json[id]["sites_data"];
                const title = datalink_json[id]["name"]
                mirror_title.innerHTML = `Mirror Link ${title} :`;
                garapandiv.hidden = false
                for (const site_name in sites_data) {
                    const site_data = sites_data[site_name];

                    for (const url of main_url[site_name]) {
                        if(site_data != "" && site_data != null && site_data != undefined){
                            html += `<a class="link" href="${url + site_data}" target="_blank">
                                <i class="fas fa-external-link-alt">&nbsp;</i>${url + site_data}
                            </a>`;
                        }
                    }
                }
            } else {
                garapandiv.hidden = true
                if(id==null || id==undefined || id==""){
                    mirror_title.innerHTML = "List Garapan :";
                    for (const id_garap in datalink_json){
                        html += `<a class="link" href="https://saipulipoel.github.io/mangalink?id=${id_garap}">
                                <i class="fas fa-book-open">&nbsp;</i>${datalink_json[id_garap]["name"]}
                            </a>`;
                    }
                }else{
                    mirror_title.innerHTML = "Link tidak ditemukan"
                    html += `<a class="link" href="https://saipulipoel.github.io/mangalink">
                                <i class="fas fa-linkedin">&nbsp;</i>Lihat List Garapan
                            </a>`;
                }
            }

            const linkdiv = document.getElementById("links");
            linkdiv.innerHTML = html;
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
});