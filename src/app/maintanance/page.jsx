import ErrorPage from '@/src/components/404';

export const metadata = {
    title: {
        default: 'Palmal Group of Industries Ltd - Powering Business Globally',
    },
    description:
        'Palmal Group of Industries, one of the promising RMG manufacturing business organizations, emerged in 1984 from the sole initiative of Late Engr. Mr. Nurul Haque Sikder, the former and founder Chairman and Managing Director of the Group.',
};

export default function Page() {
    return (
        <main>
            <ErrorPage title={"Under <br/> Maintenance"}  description={"We’re going to serve your better"}/>
        </main>
    );
}
