const { statSync, readdirSync } = require('fs');
const path = require('path');

const createLocalizedQuiz = (graphql, createPage) => {
  const getDirectories = p =>
    readdirSync(p).filter(f => statSync(path.join(p, f)).isDirectory());

  const createQuiz = (language, languages) =>
    graphql(`
    query {
      translations: allMarkdownRemark(
        filter: {
          fields: {
            folderGroup: { eq: "translations" }
            folder: { eq: "${language}" }
          }
        }
      ) {
        edges {
          node {
            frontmatter {
              next
              previous
              introTitle
              introIntro
              introButtonLabel

              questionsTitle

              resultsTitle
              resultsThankYou
              resultsCompare
              resultsShare
              resultsAction

              councilOfEurope
            }
          }
        }
      }

      explainer: allMarkdownRemark(
        filter: {
          fields: {
            folderGroup: { eq: "explainer" }
            folder: { eq: "${language}" }
          }
        }
      ) {
        edges {
          node {
            frontmatter {
              title
              points {
                title
              }
            }
            html
          }
        }
      }

      questions: allMarkdownRemark(
        filter: {
          fields: {
            folderGroup: { eq: "questions" }
            folder: { eq: "${language}" }
          }
        }
      ) {
        edges {
          node {
            frontmatter {
              id
              title
              answers
            }
            html
          }
        }
      }
    }
  `).then(
      ({
        data: {
          translations: { edges: translations },
          questions: { edges: questions },
          explainer: { edges: explainer }
        }
      }) => {
        const url = language === 'en' ? '/' : `/${language}/`;

        return createPage({
          path: url,
          component: path.resolve('src/templates/quiz/index.jsx'),
          context: {
            questions,
            language,
            languages,
            translations,
            explainer
          }
        });
      }
    );

  const languages = getDirectories('./data/questions');

  return Promise.all(
    languages.map(language => createQuiz(language, languages))
  );
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const absPath = node.fileAbsolutePath.split('/');
    const folderGroup = absPath[absPath.length - 3];
    const folder = absPath[absPath.length - 2];
    const fileName = absPath[absPath.length - 1];

    createNodeField({
      node,
      name: 'fileName',
      value: fileName
    });

    createNodeField({
      node,
      name: 'folder',
      value: folder
    });

    createNodeField({
      node,
      name: 'folderGroup',
      value: folderGroup
    });
  }
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return Promise.all([createLocalizedQuiz(graphql, createPage)]);
};
