import BlogContainer from '@/components/ui/BlogContainer'
import Hero from '@/components/ui/Hero';
import Modal from '@/components/ui/Modal';
import Spinner from '@/components/ui/Spinner';
import { getUsetInfo } from '@/services/apiBlog';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import SignupPage from './SignupPage';
import { useState } from 'react';

const ProfilePage = ({ authUsername }) => {

    const [showModal, setShowModal] = useState(false)

    const { username } = useParams()

    const { data, isPending } = useQuery({
        queryKey: ["users", username],
        queryFn: () => getUsetInfo(username)
    })

    const blogs = data?.author_posts

    const toggleModal = () => {
        setShowModal(curr => !curr)
    }


    if (isPending) {
        return <Spinner />
    }

    return (
        <>
            <Hero userInfo={data} authUsername={authUsername} toggleModal={toggleModal} />
            <BlogContainer blogs={blogs} isPending={isPending} />

            {showModal && <Modal>
                <SignupPage userInfo={data} updateForm={true} toggleModal={toggleModal} />
            </Modal>}
        </>
    );
};


export default ProfilePage