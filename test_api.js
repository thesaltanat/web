async function testAPI() {
    try {
        const url = 'https://bestinbd.com/projects/web/2509TSL/api/get-req-data/sections?type=slug&value=home&get_section=yes&image=yes&post=yes&file=yes&gallery=no';
        console.log('Fetching:', url);

        const response = await fetch(url);
        const data = await response.json();

        console.log('\n=== API Response ===');
        console.log('Status:', response.status);
        console.log('Has data property:', !!data.data);
        console.log('Has page_data:', !!data.data?.page_data);
        console.log('Has sections:', !!data.data?.sections);
        console.log('Success field:', data.success);
        console.log('\nData keys:', Object.keys(data));
        if (data.data) {
            console.log('data.data keys:', Object.keys(data.data));
        }
        console.log('\nFirst 1000 chars:');
        console.log(JSON.stringify(data, null, 2).substring(0, 1000));
    } catch (error) {
        console.error('Error:', error.message);
    }
}

testAPI();
