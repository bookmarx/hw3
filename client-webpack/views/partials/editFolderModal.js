<!-- Edit Folder Modal -->
<div id="openEditFolderModal" class="modal-dialog">
    <section>
        <form action="/v1/bm/editFolder/" method="post">
            <header class="modal-header dark-primary-color">
                <h2>Edit Folder</h2>
            </header>
            <div class="modal-body">
                <label for="name-folder">Name</label>
                <input type="text" name="name" placeholder="Name" id="edit-name-folder">
                <label for="description-folder">Description</label>
                <textarea name="description" placeholder="Description" id="edit-description-folder"></textarea>
                <label for="keyword-folder">Keyword</label>
                <input type="text" name="keyword" placeholder="Keyword" id="edit-keyword-folder">
            </div>
            <footer class="modal-footer">
                <!-- <a href="#close" title="Close" class="button">Delete</a> -->
                <!-- <a href="#close" title="Close" class="button button-danger">Delete</a> -->
                <a href="/v1/bm/" title="Close"  class="button" id="bm-edit-folder-cancel-btn">Cancel</a>
                <button type="submit" class="button button-primary" id="bm-edit-folder-save-btn">Save</button>

            </footer>
        </form>
    </section>
</div>
