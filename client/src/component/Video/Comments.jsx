import React from 'react'
import { MaterializeInput } from '../forms/Input'
import { BtnWithIcon } from '../forms/Button'
import { BiChevronsLeft, BiChevronsRight, BiSend } from 'react-icons/bi'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { ImCheckmark } from 'react-icons/im'
import { baseUrl } from '../utils/url'

function Comments() {

    const { videoId } = useParams()

    const [datas, setDatas] = useState({ videoId: videoId, name: '', comment: '' })
    const [comments, setComments] = useState([])
    const [spinner, setspinner] = useState({ commentSpinner: true })



    useEffect(() => {
        const getComments = async () => {
            try {
                const response = await axios.get(`${baseUrl}/comment/${videoId}`)
                setComments(response.data)
                setspinner({ ...spinner, commentSpinner: false })
            } catch (err) {
                setspinner({ ...spinner, commentSpinner: false })
                console.log(err)
            }
        }

        getComments()
    }, [datas])

    console.log(datas)


    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(3)

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = comments.slice(indexOfFirstPost, indexOfLastPost)

    // comments.map(c => console.log(c))


    const handlePrev = () => {
        if( currentPage > 1  ) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNext = () => {
        if( indexOfLastPost < comments.length  ) {
            setCurrentPage(currentPage + 1)

        }
    }


    const handleBtnClick = async () => {
        try {
            const response = await axios({
                method: 'post',
                url: `${baseUrl}/comment/`,
                data: datas
            })
            setDatas({videoId: videoId, name: '', comment: ''})
        } catch (err) {
            console.log(err)
        }
    }


    // console.log(datas);

    return (
        <>
            <h4 className='mb-1'>{comments.length} Comments</h4>
            <div className="d-f" style={{ gap: '20px', alignItems: 'flex-end' }}>
                {/* <div className="avater" style={{}}>
                    <img src='/images/Deals.png' width='100%' height='100%' style={{ borderRadius: '50%', }} />
                </div> */}

                <div className='flex1 d-f' style={{ gap: '30px' }}>
                    <div className='flex1'>
                        <MaterializeInput placeholder='Enter your name' value={datas.name} onChange={(e) => setDatas({ ...datas, name: e.target.value })} />
                    </div>
                    <div className='flex1'>
                        <MaterializeInput placeholder='Add a comment' value={datas.comment} onChange={(e) => setDatas({ ...datas, comment: e.target.value })} />
                    </div>
                    <div>
                        <BtnWithIcon icon={<BiSend size='15px' />} text='Comment' handleBtnClick={handleBtnClick} />
                    </div>
                </div>
            </div>
            
            {
                spinner.commentSpinner ?
                    <div className="d-ff a-i mt-4" style={{}}>
                        <div className="md_spinner"></div>
                        <div className="spin_text fs-3">Loading Comments</div>
                    </div> :
                    comments.length < 1 ?
                        <div className="d-ff a-i mt-4" style={{}}>
                            <div className="fs-6">No comment yet.</div>
                            <div className="fs-3">Be the first to comment</div>
                        </div> :
                        currentPosts.map(comment => (
                            <div key={comment._id} className="d-f mt-4" style={{ gap: '20px', alignItems: 'flex-end' }}>
                                <div className="avater d-f j-cc a-i" style={{ width: '40px', height: '40px', backgroundColor: 'grey', borderRadius: '50%', }}>
                                    <div style={{textTransform: 'uppercase'}}>{comment.name.slice(0,2)}</div>
                                </div>
                                <div className='flex1'>
                                    <h3 className='mt-0 mb-0'>{comment.name}</h3>
                                    <small>{comment.comment}</small>
                                </div>
                            </div>
                        ))

            }

            {/* {
                currentPosts.map(comment => (
                    <div className="d-f mt-4" style={{ gap: '20px', alignItems: 'flex-end' }}>
                        <div className="avater d-f j-cc a-i" style={{ width: '40px', height: '40px', backgroundColor: 'grey', borderRadius: '50%', }}>
                            <img src='/images/Deals.png' width='100%' height='100%' style={{ borderRadius: '50%', }} />
                            <div>{comment.name.slice(0, 2)}</div>
                        </div>
                        <div className='flex1'>
                            <h3 className='mt-0 mb-0'>{comment.name}</h3>
                            <small>{comment.comment}</small>
                        </div>
                    </div>
                ))
            } */}

            <div className="d-f j-cs mt-4">
                <div>
                    <BtnWithIcon icon={<BiChevronsLeft />} text='Prev' handleBtnClick={handlePrev} />
                </div>
                <div>
                    <BtnWithIcon icon={<BiChevronsRight />} text='Next' handleBtnClick={handleNext} />
                </div>
            </div>
        </>
    )
}

export default Comments