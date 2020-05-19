/**
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { h, FunctionalComponent, RenderableProps, VNode } from 'preact';
import styles from 'css-bundle:./css/all.css';

import bundleURL, { imports } from 'client-bundle:client/all/index.tsx';
import analyticsBundleURL from 'client-bundle:client/analytics/index.js';

interface Props {
  title: string;
  authorAction?: string;
  extraHead?: VNode;
  extraBody?: VNode;
}

const BasePage: FunctionalComponent<Props> = ({
  children,
  title,
  extraHead,
  extraBody,
  authorAction,
}: RenderableProps<Props>) => {
  return (
    <html lang="en">
      <head>
        <title>{title} - JakeArchibald.com</title>
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0"
        ></meta>
        <link rel="stylesheet" href={styles} />
        <script type="module" async src={analyticsBundleURL}></script>
        <link rel="stylesheet" href="{% static 'css/all.css' %}" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Jake Archibald's Blog"
          href="/posts.rss"
        />
        <script type="module" src={bundleURL} />
        {imports.map((v) => (
          <link rel="preload" as="script" href={v} crossOrigin="" />
        ))}
        {extraHead}
      </head>
      <body>
        <header class="site-header">
          <div class="inner page-width">
            <a href="/" class="title">
              Jake Archibald<span class="js-action">{authorAction}</span>
            </a>
            <a href="/who/" class="who">
              who?
            </a>
          </div>
        </header>
        <div class="container">{children}</div>
        {extraBody}
      </body>
    </html>
  );
};

export default BasePage;
