import ErrorPage from '@/src/components/404';

export default function NotFound() {
    return (
        <ErrorPage title={'404'} subtitle={'not found'} description={'The resource requested could not be found on the server.'} buttLabel={'Go Back'} buttonLink={'/'} />
    );
}
