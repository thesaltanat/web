async function test() {
    try {
        const res = await fetch('https://bestinbd.com/projects/web/2509TSL/api/get-req-data/sections?type=slug&value=home&get_section=yes&image=yes&post=yes&file=yes&gallery=no');
        const data = await res.json();
        console.log(JSON.stringify(data, null, 2).slice(0, 1000));
    } catch (e) {
        console.error(e);
    }
}
test();
