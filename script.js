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

            const linkdiv = document.getElementById("links");
            linkdiv.innerHTML = html;
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
});