import React from "react"
import { IoMdClose } from "react-icons/io"
import { Btn1 } from "../forms/Button"
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useState } from "react"
import { ImCheckmark } from "react-icons/im"

const Share = ({ setShare, url }) => {
    const [text, setText] = useState(url)
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {

    }

    return (
        <>
            <div className='modalCont'>
                <div className='modalWrap' onClick={() => setShare(false)}></div>
                <div className="res-modal-wrap">
                    <div className="fs-5">Share in a post</div>
                    <div className="p-a" style={{ right: '15px' }} onClick={() => setShare(false)}> <IoMdClose style={{ margin: '0px', }} size='25px' color="red" /> </div>
                    <div className="line">
                        <div className='fs-3'>{url}</div>
                        <CopyToClipboard text={text}
                            onCopy={() => setCopied(true)}
                        >
                            <div>
                                <Btn1 text={copied ? <div className="d-f j-cc a-i"> <ImCheckmark size={15} style={{ margin: '0px' }} /> Copied </div> : 'Copy'} style={{ backgroundColor: 'green' }} handleBtnClick={handleCopy} />
                            </div>
                        </CopyToClipboard>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Share