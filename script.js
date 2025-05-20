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
        .then(response => response.json())
        .then(data => {
            datalink_json = data;

            let html = "";
            const urlParams = new URLSearchParams(window.location.search);
            const title = urlParams.get('title');

            if (Object.hasOwn(datalink_json, title)) {
                const sites = datalink_json[title];

                for (const site_name in sites) {
                    const site_data = sites[site_name];

                    for (const url of main_url[site_name]) {
                        html += `<a class="link" href="${url + site_data}" target="_blank">
                            <i class="fab fa-external-link">&nbsp;</i>${url + site_data}
                        </a>`;
                    }
                }
            } else {
                html += `<a class="link" href="https://www.facebook.com/pantectranslation" target="_blank">
                            <i class="fab fa-facebook">&nbsp;</i>Link tidak ditemukan, kembali ke facebook
                        </a>`;
            }

            const mirror_title = document.getElementById("idxu");
            const linkdiv = document.getElementById("links");
            linkdiv.innerHTML = html;
            mirror_title.innerHTML = title;
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
});