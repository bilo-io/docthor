import React from 'react';
import './style.scss';

export const DocsNav = (props) => {
    return (
        <div>
            {props.docSections.map((group, group_index) => (
                <DocGroup
                    key={group_index}
                    className='menu-group'>
                    {(group.children || []).map((section, section_index) => (
                        <div
                            key={`${group_index} ${section_index}`}
                            onClick={() => props.selectDoc(section.link)}
                            className='menu-section'>
                            {section.label}
                        </div>
                    ))}
                </DocGroup>
            ))}
        </div>
    )
}

export const DocGroup = (props) => {
    return (
        <div className={`${props.className || ''} ${props.isOpen ? 'open' : ''}`}>
            <div className={`title ${props.isOpen ? 'active' : ''}`}>
                {props.label}
            </div>    
            {props.isOpen ? props.children : null}
        </div>
    )
}

export default DocsNav;