

module.exports = {
    renderIndexPage: renderIndexPage
};


/**
 * render renderIndexPage page template
 * @param req
 * @param res
 */
function renderIndexPage(req, res) {
    res.sendFile('views/index.html', {root: __base__});
}
