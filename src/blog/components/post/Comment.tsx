import React from 'react';
import { observer } from 'mobx-react-lite';
import Giscus from '@giscus/react';

// const src = 'https://utteranc.es/client.js';
const repo = 'biud436/blog-front';

export const GithubComment = observer(() => {
    return (
        <React.Fragment>
            <Giscus
                id="giscus-comments"
                repo={repo}
                repoId="R_kgDOILkZfQ"
                category="Announcements"
                categoryId="DIC_kwDOILkZfc4CT_gP"
                lang={'ko'}
                mapping="pathname"
                loading="lazy"
                theme="light"
                strict="0"
            />
        </React.Fragment>
    );
});

export default GithubComment;
