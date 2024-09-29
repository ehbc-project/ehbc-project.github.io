
function number_contents() {
    let chapter = 1;
    Array.from(document.getElementsByTagName('section')).forEach((section) => {
        if (section.classList.contains('toc-exclude')) return;
        if (section.getElementsByTagName('h1').length < 1) return;

        // number headings
        let l1heading = section.getElementsByTagName('h1').item(0);
        l1heading.innerText = `Chapter ${chapter}. ` + l1heading.innerText;
        l1heading.id = `chap${chapter}`;

        let l2index = 1;
        Array.from(section.getElementsByTagName('h2')).forEach((l2heading) => {
            l2heading.innerText = `${chapter}.${l2index}. ` + l2heading.innerText;
            l2heading.id = `chap${chapter}-${l2index}`;
            let l3index = 1;
            Array.from(section.getElementsByTagName('h3')).forEach((l3heading) => {
                l3heading.id = ``
                l3heading.id = `chap${chapter}-${l2index}-${l3index}`;
                l3index += 1;
            });
            l2index += 1;
        });

        // number figures
        let figure_index = 1;
        Array.from(section.getElementsByTagName('figcaption')).forEach((caption) => {
            caption.innerText = `Figure ${chapter}-${figure_index} ` + caption.innerText;
            caption.parentElement.id = `fig${chapter}-${figure_index}`;
            figure_index += 1;
        });

        // number tables
        let table_index = 1;
        Array.from(section.getElementsByTagName('caption')).forEach((caption) => {
            caption.innerText = `Table ${chapter}-${table_index} ` + caption.innerText;
            caption.parentElement.id = `tab${chapter}-${figure_index}`;
            table_index += 1;
        });

        chapter += 1;
    });
}

function build_toc() {
    let toc = document.getElementById('toc');
    let toc_contents = "";
    let tof_contents = "";
    let tot_contents = "";
    Array.from(document.getElementsByTagName('section')).forEach((section) => {
        if (section.classList.contains('toc-exclude')) return;
        if (section.getElementsByTagName('h1').length < 1) return;

        // tabe of contents
        let l1heading = section.getElementsByTagName('h1').item(0);
        toc_contents += `<li><div><a href="#${l1heading.id}">${l1heading.innerText}</a><div class="dots"></div></div><ul>`;
        Array.from(section.getElementsByTagName('h2')).forEach((l2heading) => {
            toc_contents += `<li><div><a href="#${l2heading.id}">${l2heading.innerText}</a><div class="dots"></div></div><ul>`;
            Array.from(section.getElementsByTagName('h3')).forEach((l3heading) => {
                toc_contents += `<li><div><a href="#${l3heading.id}">${l3heading.innerText}</a><div class="dots"></div></div></li>`;
            });
            toc_contents += "</ul></li>";
        });
        toc_contents += "</ul></li>";

        // table of figures
        Array.from(section.getElementsByTagName('figcaption')).forEach((caption) => {
            tof_contents += `<li><div><a href="#${caption.parentElement.id}">${caption.innerText}</a><div class="dots"></div></div></li>`;
        });

        // table of captions
        Array.from(section.getElementsByTagName('caption')).forEach((caption) => {
            tof_contents += `<li><div><a href="#${caption.parentElement.id}">${caption.innerText}</a><div class="dots"></div></div></li>`;
        });
    });
    toc.innerHTML = toc_contents;
    tof.innerHTML = tof_contents;
    tot.innerHTML = tot_contents;
}

function build_reg_desc() {
    Array.from(document.getElementsByClassName('register-description')).forEach((regdesc) => {
        if (regdesc.getElementsByTagName('table').length < 2) return;
        let table = regdesc.getElementsByTagName('table').item(1);

        table.innerHTML = `<thead><tr><th>Bit Index</th><th>Description</th></tr></thead>` + table.innerHTML;
    });
}

function build_syscall_desc() {
    Array.from(document.getElementsByClassName('syscall-description')).forEach((syscalldesc) => {
        if (syscalldesc.getElementsByTagName('table').length < 1) return;
        let table = syscalldesc.getElementsByTagName('table').item(0);

        table.innerHTML = `<thead><tr><th>Function Code</th><th>Description</th></tr></thead>` + table.innerHTML;
    });
}

window.onload = function () {
    build_reg_desc();
    build_syscall_desc();

    number_contents();
    build_toc();
}
