'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const VIEW_TYPE_TODO = 'online.larslockefeer.obsidian-plugin-todo';

var TodoItemStatus;
(function (TodoItemStatus) {
    TodoItemStatus[TodoItemStatus["Todo"] = 0] = "Todo";
    TodoItemStatus[TodoItemStatus["Done"] = 1] = "Done";
})(TodoItemStatus || (TodoItemStatus = {}));
// eslint-disable-next-line @typescript-eslint/no-namespace
(function (TodoItemStatus) {
    function toggleStatus(status) {
        switch (status) {
            case TodoItemStatus.Todo:
                return TodoItemStatus.Done;
            case TodoItemStatus.Done:
                return TodoItemStatus.Todo;
        }
    }
    TodoItemStatus.toggleStatus = toggleStatus;
})(TodoItemStatus || (TodoItemStatus = {}));
class TodoItem {
    constructor(status, description, isSomedayMaybeNote, sourceFilePath, startIndex, length, actionDate) {
        this.status = status;
        this.description = description;
        this.actionDate = actionDate;
        this.isSomedayMaybeNote = isSomedayMaybeNote;
        this.sourceFilePath = sourceFilePath;
        this.startIndex = startIndex;
        this.length = length;
    }
}

var Icon;
(function (Icon) {
    Icon[Icon["Inbox"] = 0] = "Inbox";
    Icon[Icon["Reveal"] = 1] = "Reveal";
    Icon[Icon["Scheduled"] = 2] = "Scheduled";
    Icon[Icon["Someday"] = 3] = "Someday";
    Icon[Icon["Today"] = 4] = "Today";
})(Icon || (Icon = {}));
const RenderIcon = (icon, title = '', description = '') => {
    const svg = svgForIcon(icon)(title, description);
    return parser.parseFromString(svg, 'text/xml').documentElement;
};
const parser = new DOMParser();
const svgForIcon = (icon) => {
    switch (icon) {
        case Icon.Inbox:
            return inboxIcon;
        case Icon.Reveal:
            return revealIcon;
        case Icon.Scheduled:
            return scheduledIcon;
        case Icon.Someday:
            return somedayIcon;
        case Icon.Today:
            return todayIcon;
    }
};
const inboxIcon = (title, description) => `
<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" aria-label="${title + description}">
  <title>${title}</title>
  <description>${description}</description>
  <path d="M0 0h24v24H0V0z" fill="none"/>
  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5v-3h3.56c.69 1.19 1.97 2 3.45 2s2.75-.81 3.45-2H19v3zm0-5h-4.99c0 1.1-.9 2-2 2s-2-.9-2-2H5V5h14v9z"/>
</svg>
`;
const revealIcon = (title, description) => `
<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" role="img" aria-label="${title + description}">
  <title>${title}</title>
  <description>${description}</description>
  <rect fill="none" height="24" width="24"/><path d="M9,5v2h6.59L4,18.59L5.41,20L17,8.41V15h2V5H9z"/>
</svg>
`;
const scheduledIcon = (title, description) => `
<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" aria-label="${title + description}">
  <title>${title}</title>
  <description>${description}</description>
  <path d="M0 0h24v24H0V0z" fill="none"/>
  <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V10h16v11zm0-13H4V5h16v3z"/>
</svg>
`;
const somedayIcon = (title, description) => `
<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" aria-label="${title + description}">
  <title>${title}</title>
  <description>${description}</description>
  <g><rect fill="none" height="24" width="24"/></g>
  <g><g><path d="M20,2H4C3,2,2,2.9,2,4v3.01C2,7.73,2.43,8.35,3,8.7V20c0,1.1,1.1,2,2,2h14c0.9,0,2-0.9,2-2V8.7c0.57-0.35,1-0.97,1-1.69V4 C22,2.9,21,2,20,2z M19,20H5V9h14V20z M20,7H4V4h16V7z"/><rect height="2" width="6" x="9" y="12"/></g></g>
</svg>
`;
const todayIcon = (title, description) => `
<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" aria-label="${title + description}">
  <title>${title}</title>
  <description>${description}</description>
  <path d="M0 0h24v24H0V0z" fill="none"/>
  <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>
</svg>
`;

var TodoItemViewPane;
(function (TodoItemViewPane) {
    TodoItemViewPane[TodoItemViewPane["Today"] = 0] = "Today";
    TodoItemViewPane[TodoItemViewPane["Scheduled"] = 1] = "Scheduled";
    TodoItemViewPane[TodoItemViewPane["Inbox"] = 2] = "Inbox";
    TodoItemViewPane[TodoItemViewPane["Someday"] = 3] = "Someday";
})(TodoItemViewPane || (TodoItemViewPane = {}));
class TodoItemView extends obsidian.ItemView {
    constructor(leaf, props) {
        super(leaf);
        this.props = props;
        this.state = {
            activePane: TodoItemViewPane.Today,
        };
    }
    getViewType() {
        return VIEW_TYPE_TODO;
    }
    getDisplayText() {
        return 'Todo';
    }
    getIcon() {
        return 'checkmark';
    }
    onClose() {
        return Promise.resolve();
    }
    setProps(setter) {
        this.props = setter(this.props);
        this.render();
    }
    setViewState(newState) {
        this.state = newState;
        this.render();
    }
    render() {
        const container = this.containerEl.children[1];
        container.empty();
        container.createDiv('todo-item-view-container', (el) => {
            el.createDiv('todo-item-view-toolbar', (el) => {
                this.renderToolBar(el);
            });
            el.createDiv('todo-item-view-items', (el) => {
                this.renderItems(el);
            });
        });
    }
    renderToolBar(container) {
        const activeClass = (pane) => {
            return pane === this.state.activePane ? ' active' : '';
        };
        const setActivePane = (pane) => {
            const newState = Object.assign(Object.assign({}, this.state), { activePane: pane });
            this.setViewState(newState);
        };
        container.createDiv(`todo-item-view-toolbar-item${activeClass(TodoItemViewPane.Today)}`, (el) => {
            el.appendChild(RenderIcon(Icon.Today, 'Today'));
            el.onClickEvent(() => setActivePane(TodoItemViewPane.Today));
        });
        container.createDiv(`todo-item-view-toolbar-item${activeClass(TodoItemViewPane.Scheduled)}`, (el) => {
            el.appendChild(RenderIcon(Icon.Scheduled, 'Scheduled'));
            el.onClickEvent(() => setActivePane(TodoItemViewPane.Scheduled));
        });
        container.createDiv(`todo-item-view-toolbar-item${activeClass(TodoItemViewPane.Inbox)}`, (el) => {
            el.appendChild(RenderIcon(Icon.Inbox, 'Inbox'));
            el.onClickEvent(() => setActivePane(TodoItemViewPane.Inbox));
        });
        container.createDiv(`todo-item-view-toolbar-item${activeClass(TodoItemViewPane.Someday)}`, (el) => {
            el.appendChild(RenderIcon(Icon.Someday, 'Someday / Maybe'));
            el.onClickEvent(() => setActivePane(TodoItemViewPane.Someday));
        });
    }
    renderItems(container) {
        this.props.todos
            .filter(this.filterForState, this)
            .sort(this.sortByActionDate)
            .forEach((todo) => {
            container.createDiv('todo-item-view-item', (el) => {
                el.createDiv('todo-item-view-item-checkbox', (el) => {
                    el.createEl('input', { type: 'checkbox' }, (el) => {
                        el.checked = todo.status === TodoItemStatus.Done;
                        el.onClickEvent(() => {
                            this.toggleTodo(todo);
                        });
                    });
                });
                el.createDiv('todo-item-view-item-description', (el) => {
                    obsidian.MarkdownRenderer.renderMarkdown(todo.description, el, todo.sourceFilePath, this);
                });
                el.createDiv('todo-item-view-item-link', (el) => {
                    el.appendChild(RenderIcon(Icon.Reveal, 'Open file'));
                    el.onClickEvent(() => {
                        this.openFile(todo);
                    });
                });
            });
        });
    }
    filterForState(value, _index, _array) {
        const isToday = (date) => {
            const today = new Date();
            return (date.getDate() == today.getDate() &&
                date.getMonth() == today.getMonth() &&
                date.getFullYear() == today.getFullYear());
        };
        const isBeforeToday = (date) => {
            const today = new Date();
            return date < today;
        };
        const isTodayNote = value.actionDate && (isToday(value.actionDate) || isBeforeToday(value.actionDate));
        const isScheduledNote = !value.isSomedayMaybeNote && value.actionDate && !isTodayNote;
        switch (this.state.activePane) {
            case TodoItemViewPane.Inbox:
                return !value.isSomedayMaybeNote && !isTodayNote && !isScheduledNote;
            case TodoItemViewPane.Scheduled:
                return isScheduledNote;
            case TodoItemViewPane.Someday:
                return value.isSomedayMaybeNote;
            case TodoItemViewPane.Today:
                return isTodayNote;
        }
    }
    sortByActionDate(a, b) {
        if (!a.actionDate && !b.actionDate) {
            if (a.isSomedayMaybeNote && !b.isSomedayMaybeNote) {
                return -1;
            }
            if (!a.isSomedayMaybeNote && b.isSomedayMaybeNote) {
                return 1;
            }
            return 0;
        }
        return a.actionDate < b.actionDate ? -1 : a.actionDate > b.actionDate ? 1 : 0;
    }
    toggleTodo(todo) {
        this.props.toggleTodo(todo, TodoItemStatus.toggleStatus(todo.status));
    }
    openFile(todo) {
        this.props.openFile(todo.sourceFilePath);
    }
}

class TodoParser {
    parseTasks(filePath, fileContents) {
        return __awaiter(this, void 0, void 0, function* () {
            const pattern = /(-|\*) \[(\s|x)?\]\s(.*)/g;
            return [...fileContents.matchAll(pattern)].map((task) => this.parseTask(filePath, task));
        });
    }
    parseTask(filePath, entry) {
        var _a, _b;
        const todoItemOffset = 2; // Strip off `-|* `
        const status = entry[2] === 'x' ? TodoItemStatus.Done : TodoItemStatus.Todo;
        const description = entry[3];
        const datePattern = /#(\d{4}-\d{2}-\d{2})/g;
        const somedayPattern = /#(someday)/g;
        const dateMatches = description.match(datePattern);
        const actionDate = dateMatches != null ? new Date((_a = dateMatches[0]) === null || _a === void 0 ? void 0 : _a.substring(1)) : undefined;
        return new TodoItem(status, description, description.match(somedayPattern) != null, filePath, ((_b = entry.index) !== null && _b !== void 0 ? _b : 0) + todoItemOffset, entry[0].length - todoItemOffset, actionDate);
    }
}

class TodoIndex {
    constructor(vault, listener) {
        this.vault = vault;
        this.todos = new Map();
        this.listeners = [listener];
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: persist index & last sync timestamp; only parse files that changed since then.
            const todoMap = new Map();
            let numberOfTodos = 0;
            const timeStart = new Date().getTime();
            const markdownFiles = this.vault.getMarkdownFiles();
            for (const file of markdownFiles) {
                const todos = yield this.parseTodosInFile(file);
                numberOfTodos += todos.length;
                if (todos.length > 0) {
                    todoMap.set(file.path, todos);
                }
            }
            const totalTimeMs = new Date().getTime() - timeStart;
            console.log(`[obsidian-plugin-todo] Parsed ${numberOfTodos} TODOs from ${markdownFiles.length} markdown files in (${totalTimeMs / 1000.0}s)`);
            this.todos = todoMap;
            this.registerEventHandlers();
            this.invokeListeners();
        });
    }
    setStatus(todo, newStatus) {
        const file = this.vault.getAbstractFileByPath(todo.sourceFilePath);
        const fileContents = this.vault.read(file);
        fileContents.then((c) => {
            const newTodo = `[${newStatus === TodoItemStatus.Done ? 'x' : ' '}] ${todo.description}`;
            const newContents = c.substring(0, todo.startIndex) + newTodo + c.substring(todo.startIndex + todo.length);
            this.vault.modify(file, newContents);
        });
    }
    indexAbstractFile(file) {
        if (!(file instanceof obsidian.TFile)) {
            return;
        }
        this.indexFile(file);
    }
    indexFile(file) {
        this.parseTodosInFile(file).then((todos) => {
            this.todos.set(file.path, todos);
            this.invokeListeners();
        });
    }
    clearIndex(path, silent = false) {
        this.todos.delete(path);
        if (!silent) {
            this.invokeListeners();
        }
    }
    parseTodosInFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Does it make sense to index completed TODOs at all?
            const todoParser = new TodoParser();
            const fileContents = yield this.vault.cachedRead(file);
            return todoParser
                .parseTasks(file.path, fileContents)
                .then((todos) => todos.filter((todo) => todo.status === TodoItemStatus.Todo));
        });
    }
    registerEventHandlers() {
        this.vault.on('create', (file) => {
            this.indexAbstractFile(file);
        });
        this.vault.on('modify', (file) => {
            this.indexAbstractFile(file);
        });
        this.vault.on('delete', (file) => {
            this.clearIndex(file.path);
        });
        // We could simply change the references to the old path, but parsing again does the trick as well
        this.vault.on('rename', (file, oldPath) => {
            this.clearIndex(oldPath);
            this.indexAbstractFile(file);
        });
    }
    invokeListeners() {
        const todos = [].concat(...Array.from(this.todos.values()));
        this.listeners.forEach((listener) => listener(todos));
    }
}

class TodoPlugin extends obsidian.Plugin {
    constructor(app, manifest) {
        super(app, manifest);
        this.todoIndex = new TodoIndex(this.app.vault, this.tick.bind(this));
    }
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            this.registerView(VIEW_TYPE_TODO, (leaf) => {
                const todos = [];
                const props = {
                    todos: todos,
                    openFile: (filePath) => {
                        const file = this.app.vault.getAbstractFileByPath(filePath);
                        this.app.workspace.splitActiveLeaf().openFile(file);
                    },
                    toggleTodo: (todo, newStatus) => {
                        this.todoIndex.setStatus(todo, newStatus);
                    },
                };
                this.view = new TodoItemView(leaf, props);
                return this.view;
            });
            if (this.app.workspace.layoutReady) {
                this.initLeaf();
                yield this.prepareIndex();
            }
            else {
                this.registerEvent(this.app.workspace.on('layout-ready', this.initLeaf.bind(this)));
                this.registerEvent(this.app.workspace.on('layout-ready', () => __awaiter(this, void 0, void 0, function* () { return yield this.prepareIndex(); })));
            }
        });
    }
    onunload() {
        this.app.workspace.getLeavesOfType(VIEW_TYPE_TODO).forEach((leaf) => leaf.detach());
    }
    initLeaf() {
        if (this.app.workspace.getLeavesOfType(VIEW_TYPE_TODO).length) {
            return;
        }
        this.app.workspace.getRightLeaf(false).setViewState({
            type: VIEW_TYPE_TODO,
        });
    }
    prepareIndex() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.todoIndex.initialize();
        });
    }
    tick(todos) {
        this.view.setProps((currentProps) => {
            return Object.assign(Object.assign({}, currentProps), { todos: todos });
        });
    }
}

module.exports = TodoPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsImNvbnN0YW50cy50cyIsIm1vZGVsL1RvZG9JdGVtLnRzIiwidWkvaWNvbnMudHMiLCJ1aS9Ub2RvSXRlbVZpZXcudHMiLCJtb2RlbC9Ub2RvUGFyc2VyLnRzIiwibW9kZWwvVG9kb0luZGV4LnRzIiwibWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSkge1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gZnJvbS5sZW5ndGgsIGogPSB0by5sZW5ndGg7IGkgPCBpbDsgaSsrLCBqKyspXHJcbiAgICAgICAgdG9bal0gPSBmcm9tW2ldO1xyXG4gICAgcmV0dXJuIHRvO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwKSB7XHJcbiAgICBpZiAoIXByaXZhdGVNYXAuaGFzKHJlY2VpdmVyKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhdHRlbXB0ZWQgdG8gZ2V0IHByaXZhdGUgZmllbGQgb24gbm9uLWluc3RhbmNlXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByaXZhdGVNYXAuZ2V0KHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHByaXZhdGVNYXAsIHZhbHVlKSB7XHJcbiAgICBpZiAoIXByaXZhdGVNYXAuaGFzKHJlY2VpdmVyKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhdHRlbXB0ZWQgdG8gc2V0IHByaXZhdGUgZmllbGQgb24gbm9uLWluc3RhbmNlXCIpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZU1hcC5zZXQocmVjZWl2ZXIsIHZhbHVlKTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG4iLCJleHBvcnQgY29uc3QgVklFV19UWVBFX1RPRE8gPSAnb25saW5lLmxhcnNsb2NrZWZlZXIub2JzaWRpYW4tcGx1Z2luLXRvZG8nO1xuIiwiZXhwb3J0IGVudW0gVG9kb0l0ZW1TdGF0dXMge1xuICBUb2RvLFxuICBEb25lLFxufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5hbWVzcGFjZVxuZXhwb3J0IG5hbWVzcGFjZSBUb2RvSXRlbVN0YXR1cyB7XG4gIGV4cG9ydCBmdW5jdGlvbiB0b2dnbGVTdGF0dXMoc3RhdHVzOiBUb2RvSXRlbVN0YXR1cyk6IFRvZG9JdGVtU3RhdHVzIHtcbiAgICBzd2l0Y2ggKHN0YXR1cykge1xuICAgICAgY2FzZSBUb2RvSXRlbVN0YXR1cy5Ub2RvOlxuICAgICAgICByZXR1cm4gVG9kb0l0ZW1TdGF0dXMuRG9uZTtcbiAgICAgIGNhc2UgVG9kb0l0ZW1TdGF0dXMuRG9uZTpcbiAgICAgICAgcmV0dXJuIFRvZG9JdGVtU3RhdHVzLlRvZG87XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUb2RvSXRlbSB7XG4gIHB1YmxpYyBzb3VyY2VGaWxlUGF0aDogc3RyaW5nO1xuICBwdWJsaWMgc3RhcnRJbmRleDogbnVtYmVyO1xuICBwdWJsaWMgbGVuZ3RoOiBudW1iZXI7XG5cbiAgcHVibGljIHN0YXR1czogVG9kb0l0ZW1TdGF0dXM7XG4gIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBwdWJsaWMgYWN0aW9uRGF0ZT86IERhdGU7XG4gIHB1YmxpYyBpc1NvbWVkYXlNYXliZU5vdGU6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgc3RhdHVzOiBUb2RvSXRlbVN0YXR1cyxcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nLFxuICAgIGlzU29tZWRheU1heWJlTm90ZTogYm9vbGVhbixcbiAgICBzb3VyY2VGaWxlUGF0aDogc3RyaW5nLFxuICAgIHN0YXJ0SW5kZXg6IG51bWJlcixcbiAgICBsZW5ndGg6IG51bWJlcixcbiAgICBhY3Rpb25EYXRlPzogRGF0ZSxcbiAgKSB7XG4gICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMuYWN0aW9uRGF0ZSA9IGFjdGlvbkRhdGU7XG4gICAgdGhpcy5pc1NvbWVkYXlNYXliZU5vdGUgPSBpc1NvbWVkYXlNYXliZU5vdGU7XG4gICAgdGhpcy5zb3VyY2VGaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoO1xuICAgIHRoaXMuc3RhcnRJbmRleCA9IHN0YXJ0SW5kZXg7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gIH1cbn1cbiIsImV4cG9ydCBlbnVtIEljb24ge1xuICBJbmJveCxcbiAgUmV2ZWFsLFxuICBTY2hlZHVsZWQsXG4gIFNvbWVkYXksXG4gIFRvZGF5LFxufVxuXG5leHBvcnQgY29uc3QgUmVuZGVySWNvbiA9IChpY29uOiBJY29uLCB0aXRsZSA9ICcnLCBkZXNjcmlwdGlvbiA9ICcnKTogSFRNTEVsZW1lbnQgPT4ge1xuICBjb25zdCBzdmcgPSBzdmdGb3JJY29uKGljb24pKHRpdGxlLCBkZXNjcmlwdGlvbik7XG4gIHJldHVybiBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKHN2ZywgJ3RleHQveG1sJykuZG9jdW1lbnRFbGVtZW50O1xufTtcblxuY29uc3QgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuXG5jb25zdCBzdmdGb3JJY29uID0gKGljb246IEljb24pOiAoKGFyZzA6IHN0cmluZywgYXJnMTogc3RyaW5nKSA9PiBzdHJpbmcpID0+IHtcbiAgc3dpdGNoIChpY29uKSB7XG4gICAgY2FzZSBJY29uLkluYm94OlxuICAgICAgcmV0dXJuIGluYm94SWNvbjtcbiAgICBjYXNlIEljb24uUmV2ZWFsOlxuICAgICAgcmV0dXJuIHJldmVhbEljb247XG4gICAgY2FzZSBJY29uLlNjaGVkdWxlZDpcbiAgICAgIHJldHVybiBzY2hlZHVsZWRJY29uO1xuICAgIGNhc2UgSWNvbi5Tb21lZGF5OlxuICAgICAgcmV0dXJuIHNvbWVkYXlJY29uO1xuICAgIGNhc2UgSWNvbi5Ub2RheTpcbiAgICAgIHJldHVybiB0b2RheUljb247XG4gIH1cbn07XG5cbmNvbnN0IGluYm94SWNvbiA9ICh0aXRsZTogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nKTogc3RyaW5nID0+IGBcbjxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBhcmlhLWxhYmVsPVwiJHt0aXRsZSArIGRlc2NyaXB0aW9ufVwiPlxuICA8dGl0bGU+JHt0aXRsZX08L3RpdGxlPlxuICA8ZGVzY3JpcHRpb24+JHtkZXNjcmlwdGlvbn08L2Rlc2NyaXB0aW9uPlxuICA8cGF0aCBkPVwiTTAgMGgyNHYyNEgwVjB6XCIgZmlsbD1cIm5vbmVcIi8+XG4gIDxwYXRoIGQ9XCJNMTkgM0g1Yy0xLjEgMC0yIC45LTIgMnYxNGMwIDEuMS44OSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMlY1YzAtMS4xLS45LTItMi0yem0wIDE2SDV2LTNoMy41NmMuNjkgMS4xOSAxLjk3IDIgMy40NSAyczIuNzUtLjgxIDMuNDUtMkgxOXYzem0wLTVoLTQuOTljMCAxLjEtLjkgMi0yIDJzLTItLjktMi0ySDVWNWgxNHY5elwiLz5cbjwvc3ZnPlxuYDtcblxuY29uc3QgcmV2ZWFsSWNvbiA9ICh0aXRsZTogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nKTogc3RyaW5nID0+IGBcbjxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGVuYWJsZS1iYWNrZ3JvdW5kPVwibmV3IDAgMCAyNCAyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiByb2xlPVwiaW1nXCIgYXJpYS1sYWJlbD1cIiR7XG4gIHRpdGxlICsgZGVzY3JpcHRpb25cbn1cIj5cbiAgPHRpdGxlPiR7dGl0bGV9PC90aXRsZT5cbiAgPGRlc2NyaXB0aW9uPiR7ZGVzY3JpcHRpb259PC9kZXNjcmlwdGlvbj5cbiAgPHJlY3QgZmlsbD1cIm5vbmVcIiBoZWlnaHQ9XCIyNFwiIHdpZHRoPVwiMjRcIi8+PHBhdGggZD1cIk05LDV2Mmg2LjU5TDQsMTguNTlMNS40MSwyMEwxNyw4LjQxVjE1aDJWNUg5elwiLz5cbjwvc3ZnPlxuYDtcblxuY29uc3Qgc2NoZWR1bGVkSWNvbiA9ICh0aXRsZTogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nKTogc3RyaW5nID0+IGBcbjxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBhcmlhLWxhYmVsPVwiJHt0aXRsZSArIGRlc2NyaXB0aW9ufVwiPlxuICA8dGl0bGU+JHt0aXRsZX08L3RpdGxlPlxuICA8ZGVzY3JpcHRpb24+JHtkZXNjcmlwdGlvbn08L2Rlc2NyaXB0aW9uPlxuICA8cGF0aCBkPVwiTTAgMGgyNHYyNEgwVjB6XCIgZmlsbD1cIm5vbmVcIi8+XG4gIDxwYXRoIGQ9XCJNMjAgM2gtMVYxaC0ydjJIN1YxSDV2Mkg0Yy0xLjEgMC0yIC45LTIgMnYxNmMwIDEuMS45IDIgMiAyaDE2YzEuMSAwIDItLjkgMi0yVjVjMC0xLjEtLjktMi0yLTJ6bTAgMThINFYxMGgxNnYxMXptMC0xM0g0VjVoMTZ2M3pcIi8+XG48L3N2Zz5cbmA7XG5cbmNvbnN0IHNvbWVkYXlJY29uID0gKHRpdGxlOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcpOiBzdHJpbmcgPT4gYFxuPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZW5hYmxlLWJhY2tncm91bmQ9XCJuZXcgMCAwIDI0IDI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNFwiIGFyaWEtbGFiZWw9XCIke1xuICB0aXRsZSArIGRlc2NyaXB0aW9uXG59XCI+XG4gIDx0aXRsZT4ke3RpdGxlfTwvdGl0bGU+XG4gIDxkZXNjcmlwdGlvbj4ke2Rlc2NyaXB0aW9ufTwvZGVzY3JpcHRpb24+XG4gIDxnPjxyZWN0IGZpbGw9XCJub25lXCIgaGVpZ2h0PVwiMjRcIiB3aWR0aD1cIjI0XCIvPjwvZz5cbiAgPGc+PGc+PHBhdGggZD1cIk0yMCwySDRDMywyLDIsMi45LDIsNHYzLjAxQzIsNy43MywyLjQzLDguMzUsMyw4LjdWMjBjMCwxLjEsMS4xLDIsMiwyaDE0YzAuOSwwLDItMC45LDItMlY4LjdjMC41Ny0wLjM1LDEtMC45NywxLTEuNjlWNCBDMjIsMi45LDIxLDIsMjAsMnogTTE5LDIwSDVWOWgxNFYyMHogTTIwLDdINFY0aDE2Vjd6XCIvPjxyZWN0IGhlaWdodD1cIjJcIiB3aWR0aD1cIjZcIiB4PVwiOVwiIHk9XCIxMlwiLz48L2c+PC9nPlxuPC9zdmc+XG5gO1xuXG5jb25zdCB0b2RheUljb24gPSAodGl0bGU6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZyk6IHN0cmluZyA9PiBgXG48c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjI0XCIgYXJpYS1sYWJlbD1cIiR7dGl0bGUgKyBkZXNjcmlwdGlvbn1cIj5cbiAgPHRpdGxlPiR7dGl0bGV9PC90aXRsZT5cbiAgPGRlc2NyaXB0aW9uPiR7ZGVzY3JpcHRpb259PC9kZXNjcmlwdGlvbj5cbiAgPHBhdGggZD1cIk0wIDBoMjR2MjRIMFYwelwiIGZpbGw9XCJub25lXCIvPlxuICA8cGF0aCBkPVwiTTIyIDkuMjRsLTcuMTktLjYyTDEyIDIgOS4xOSA4LjYzIDIgOS4yNGw1LjQ2IDQuNzNMNS44MiAyMSAxMiAxNy4yNyAxOC4xOCAyMWwtMS42My03LjAzTDIyIDkuMjR6TTEyIDE1LjRsLTMuNzYgMi4yNyAxLTQuMjgtMy4zMi0yLjg4IDQuMzgtLjM4TDEyIDYuMWwxLjcxIDQuMDQgNC4zOC4zOC0zLjMyIDIuODggMSA0LjI4TDEyIDE1LjR6XCIvPlxuPC9zdmc+XG5gO1xuIiwiaW1wb3J0IHsgSXRlbVZpZXcsIE1hcmtkb3duUmVuZGVyZXIsIFdvcmtzcGFjZUxlYWYgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgeyBWSUVXX1RZUEVfVE9ETyB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBUb2RvSXRlbSwgVG9kb0l0ZW1TdGF0dXMgfSBmcm9tICcuLi9tb2RlbC9Ub2RvSXRlbSc7XG5pbXBvcnQgeyBSZW5kZXJJY29uLCBJY29uIH0gZnJvbSAnLi4vdWkvaWNvbnMnO1xuXG5lbnVtIFRvZG9JdGVtVmlld1BhbmUge1xuICBUb2RheSxcbiAgU2NoZWR1bGVkLFxuICBJbmJveCxcbiAgU29tZWRheSxcbn1cbmV4cG9ydCBpbnRlcmZhY2UgVG9kb0l0ZW1WaWV3UHJvcHMge1xuICB0b2RvczogVG9kb0l0ZW1bXTtcbiAgb3BlbkZpbGU6IChmaWxlUGF0aDogc3RyaW5nKSA9PiB2b2lkO1xuICB0b2dnbGVUb2RvOiAodG9kbzogVG9kb0l0ZW0sIG5ld1N0YXR1czogVG9kb0l0ZW1TdGF0dXMpID0+IHZvaWQ7XG59XG5cbmludGVyZmFjZSBUb2RvSXRlbVZpZXdTdGF0ZSB7XG4gIGFjdGl2ZVBhbmU6IFRvZG9JdGVtVmlld1BhbmU7XG59XG5cbmV4cG9ydCBjbGFzcyBUb2RvSXRlbVZpZXcgZXh0ZW5kcyBJdGVtVmlldyB7XG4gIHByaXZhdGUgcHJvcHM6IFRvZG9JdGVtVmlld1Byb3BzO1xuICBwcml2YXRlIHN0YXRlOiBUb2RvSXRlbVZpZXdTdGF0ZTtcblxuICBjb25zdHJ1Y3RvcihsZWFmOiBXb3Jrc3BhY2VMZWFmLCBwcm9wczogVG9kb0l0ZW1WaWV3UHJvcHMpIHtcbiAgICBzdXBlcihsZWFmKTtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGFjdGl2ZVBhbmU6IFRvZG9JdGVtVmlld1BhbmUuVG9kYXksXG4gICAgfTtcbiAgfVxuXG4gIGdldFZpZXdUeXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFZJRVdfVFlQRV9UT0RPO1xuICB9XG5cbiAgZ2V0RGlzcGxheVRleHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ1RvZG8nO1xuICB9XG5cbiAgZ2V0SWNvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiAnY2hlY2ttYXJrJztcbiAgfVxuXG4gIG9uQ2xvc2UoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgcHVibGljIHNldFByb3BzKHNldHRlcjogKGN1cnJlbnRQcm9wczogVG9kb0l0ZW1WaWV3UHJvcHMpID0+IFRvZG9JdGVtVmlld1Byb3BzKTogdm9pZCB7XG4gICAgdGhpcy5wcm9wcyA9IHNldHRlcih0aGlzLnByb3BzKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRWaWV3U3RhdGUobmV3U3RhdGU6IFRvZG9JdGVtVmlld1N0YXRlKSB7XG4gICAgdGhpcy5zdGF0ZSA9IG5ld1N0YXRlO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBwcml2YXRlIHJlbmRlcigpOiB2b2lkIHtcbiAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lckVsLmNoaWxkcmVuWzFdO1xuICAgIGNvbnRhaW5lci5lbXB0eSgpO1xuICAgIGNvbnRhaW5lci5jcmVhdGVEaXYoJ3RvZG8taXRlbS12aWV3LWNvbnRhaW5lcicsIChlbCkgPT4ge1xuICAgICAgZWwuY3JlYXRlRGl2KCd0b2RvLWl0ZW0tdmlldy10b29sYmFyJywgKGVsKSA9PiB7XG4gICAgICAgIHRoaXMucmVuZGVyVG9vbEJhcihlbCk7XG4gICAgICB9KTtcbiAgICAgIGVsLmNyZWF0ZURpdigndG9kby1pdGVtLXZpZXctaXRlbXMnLCAoZWwpID0+IHtcbiAgICAgICAgdGhpcy5yZW5kZXJJdGVtcyhlbCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyVG9vbEJhcihjb250YWluZXI6IEhUTUxEaXZFbGVtZW50KSB7XG4gICAgY29uc3QgYWN0aXZlQ2xhc3MgPSAocGFuZTogVG9kb0l0ZW1WaWV3UGFuZSkgPT4ge1xuICAgICAgcmV0dXJuIHBhbmUgPT09IHRoaXMuc3RhdGUuYWN0aXZlUGFuZSA/ICcgYWN0aXZlJyA6ICcnO1xuICAgIH07XG5cbiAgICBjb25zdCBzZXRBY3RpdmVQYW5lID0gKHBhbmU6IFRvZG9JdGVtVmlld1BhbmUpID0+IHtcbiAgICAgIGNvbnN0IG5ld1N0YXRlID0ge1xuICAgICAgICAuLi50aGlzLnN0YXRlLFxuICAgICAgICBhY3RpdmVQYW5lOiBwYW5lLFxuICAgICAgfTtcbiAgICAgIHRoaXMuc2V0Vmlld1N0YXRlKG5ld1N0YXRlKTtcbiAgICB9O1xuXG4gICAgY29udGFpbmVyLmNyZWF0ZURpdihgdG9kby1pdGVtLXZpZXctdG9vbGJhci1pdGVtJHthY3RpdmVDbGFzcyhUb2RvSXRlbVZpZXdQYW5lLlRvZGF5KX1gLCAoZWwpID0+IHtcbiAgICAgIGVsLmFwcGVuZENoaWxkKFJlbmRlckljb24oSWNvbi5Ub2RheSwgJ1RvZGF5JykpO1xuICAgICAgZWwub25DbGlja0V2ZW50KCgpID0+IHNldEFjdGl2ZVBhbmUoVG9kb0l0ZW1WaWV3UGFuZS5Ub2RheSkpO1xuICAgIH0pO1xuICAgIGNvbnRhaW5lci5jcmVhdGVEaXYoYHRvZG8taXRlbS12aWV3LXRvb2xiYXItaXRlbSR7YWN0aXZlQ2xhc3MoVG9kb0l0ZW1WaWV3UGFuZS5TY2hlZHVsZWQpfWAsIChlbCkgPT4ge1xuICAgICAgZWwuYXBwZW5kQ2hpbGQoUmVuZGVySWNvbihJY29uLlNjaGVkdWxlZCwgJ1NjaGVkdWxlZCcpKTtcbiAgICAgIGVsLm9uQ2xpY2tFdmVudCgoKSA9PiBzZXRBY3RpdmVQYW5lKFRvZG9JdGVtVmlld1BhbmUuU2NoZWR1bGVkKSk7XG4gICAgfSk7XG4gICAgY29udGFpbmVyLmNyZWF0ZURpdihgdG9kby1pdGVtLXZpZXctdG9vbGJhci1pdGVtJHthY3RpdmVDbGFzcyhUb2RvSXRlbVZpZXdQYW5lLkluYm94KX1gLCAoZWwpID0+IHtcbiAgICAgIGVsLmFwcGVuZENoaWxkKFJlbmRlckljb24oSWNvbi5JbmJveCwgJ0luYm94JykpO1xuICAgICAgZWwub25DbGlja0V2ZW50KCgpID0+IHNldEFjdGl2ZVBhbmUoVG9kb0l0ZW1WaWV3UGFuZS5JbmJveCkpO1xuICAgIH0pO1xuICAgIGNvbnRhaW5lci5jcmVhdGVEaXYoYHRvZG8taXRlbS12aWV3LXRvb2xiYXItaXRlbSR7YWN0aXZlQ2xhc3MoVG9kb0l0ZW1WaWV3UGFuZS5Tb21lZGF5KX1gLCAoZWwpID0+IHtcbiAgICAgIGVsLmFwcGVuZENoaWxkKFJlbmRlckljb24oSWNvbi5Tb21lZGF5LCAnU29tZWRheSAvIE1heWJlJykpO1xuICAgICAgZWwub25DbGlja0V2ZW50KCgpID0+IHNldEFjdGl2ZVBhbmUoVG9kb0l0ZW1WaWV3UGFuZS5Tb21lZGF5KSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlbmRlckl0ZW1zKGNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQpIHtcbiAgICB0aGlzLnByb3BzLnRvZG9zXG4gICAgICAuZmlsdGVyKHRoaXMuZmlsdGVyRm9yU3RhdGUsIHRoaXMpXG4gICAgICAuc29ydCh0aGlzLnNvcnRCeUFjdGlvbkRhdGUpXG4gICAgICAuZm9yRWFjaCgodG9kbykgPT4ge1xuICAgICAgICBjb250YWluZXIuY3JlYXRlRGl2KCd0b2RvLWl0ZW0tdmlldy1pdGVtJywgKGVsKSA9PiB7XG4gICAgICAgICAgZWwuY3JlYXRlRGl2KCd0b2RvLWl0ZW0tdmlldy1pdGVtLWNoZWNrYm94JywgKGVsKSA9PiB7XG4gICAgICAgICAgICBlbC5jcmVhdGVFbCgnaW5wdXQnLCB7IHR5cGU6ICdjaGVja2JveCcgfSwgKGVsKSA9PiB7XG4gICAgICAgICAgICAgIGVsLmNoZWNrZWQgPSB0b2RvLnN0YXR1cyA9PT0gVG9kb0l0ZW1TdGF0dXMuRG9uZTtcbiAgICAgICAgICAgICAgZWwub25DbGlja0V2ZW50KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZVRvZG8odG9kbyk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZWwuY3JlYXRlRGl2KCd0b2RvLWl0ZW0tdmlldy1pdGVtLWRlc2NyaXB0aW9uJywgKGVsKSA9PiB7XG4gICAgICAgICAgICBNYXJrZG93blJlbmRlcmVyLnJlbmRlck1hcmtkb3duKHRvZG8uZGVzY3JpcHRpb24sIGVsLCB0b2RvLnNvdXJjZUZpbGVQYXRoLCB0aGlzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBlbC5jcmVhdGVEaXYoJ3RvZG8taXRlbS12aWV3LWl0ZW0tbGluaycsIChlbCkgPT4ge1xuICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQoUmVuZGVySWNvbihJY29uLlJldmVhbCwgJ09wZW4gZmlsZScpKTtcbiAgICAgICAgICAgIGVsLm9uQ2xpY2tFdmVudCgoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMub3BlbkZpbGUodG9kbyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZmlsdGVyRm9yU3RhdGUodmFsdWU6IFRvZG9JdGVtLCBfaW5kZXg6IG51bWJlciwgX2FycmF5OiBUb2RvSXRlbVtdKTogYm9vbGVhbiB7XG4gICAgY29uc3QgaXNUb2RheSA9IChkYXRlOiBEYXRlKSA9PiB7XG4gICAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBkYXRlLmdldERhdGUoKSA9PSB0b2RheS5nZXREYXRlKCkgJiZcbiAgICAgICAgZGF0ZS5nZXRNb250aCgpID09IHRvZGF5LmdldE1vbnRoKCkgJiZcbiAgICAgICAgZGF0ZS5nZXRGdWxsWWVhcigpID09IHRvZGF5LmdldEZ1bGxZZWFyKClcbiAgICAgICk7XG4gICAgfTtcblxuICAgIGNvbnN0IGlzQmVmb3JlVG9kYXkgPSAoZGF0ZTogRGF0ZSkgPT4ge1xuICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgICAgcmV0dXJuIGRhdGUgPCB0b2RheTtcbiAgICB9O1xuXG4gICAgY29uc3QgaXNUb2RheU5vdGUgPSB2YWx1ZS5hY3Rpb25EYXRlICYmIChpc1RvZGF5KHZhbHVlLmFjdGlvbkRhdGUpIHx8IGlzQmVmb3JlVG9kYXkodmFsdWUuYWN0aW9uRGF0ZSkpO1xuICAgIGNvbnN0IGlzU2NoZWR1bGVkTm90ZSA9ICF2YWx1ZS5pc1NvbWVkYXlNYXliZU5vdGUgJiYgdmFsdWUuYWN0aW9uRGF0ZSAmJiAhaXNUb2RheU5vdGU7XG5cbiAgICBzd2l0Y2ggKHRoaXMuc3RhdGUuYWN0aXZlUGFuZSkge1xuICAgICAgY2FzZSBUb2RvSXRlbVZpZXdQYW5lLkluYm94OlxuICAgICAgICByZXR1cm4gIXZhbHVlLmlzU29tZWRheU1heWJlTm90ZSAmJiAhaXNUb2RheU5vdGUgJiYgIWlzU2NoZWR1bGVkTm90ZTtcbiAgICAgIGNhc2UgVG9kb0l0ZW1WaWV3UGFuZS5TY2hlZHVsZWQ6XG4gICAgICAgIHJldHVybiBpc1NjaGVkdWxlZE5vdGU7XG4gICAgICBjYXNlIFRvZG9JdGVtVmlld1BhbmUuU29tZWRheTpcbiAgICAgICAgcmV0dXJuIHZhbHVlLmlzU29tZWRheU1heWJlTm90ZTtcbiAgICAgIGNhc2UgVG9kb0l0ZW1WaWV3UGFuZS5Ub2RheTpcbiAgICAgICAgcmV0dXJuIGlzVG9kYXlOb3RlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc29ydEJ5QWN0aW9uRGF0ZShhOiBUb2RvSXRlbSwgYjogVG9kb0l0ZW0pOiBudW1iZXIge1xuICAgIGlmICghYS5hY3Rpb25EYXRlICYmICFiLmFjdGlvbkRhdGUpIHtcbiAgICAgIGlmIChhLmlzU29tZWRheU1heWJlTm90ZSAmJiAhYi5pc1NvbWVkYXlNYXliZU5vdGUpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfVxuICAgICAgaWYgKCFhLmlzU29tZWRheU1heWJlTm90ZSAmJiBiLmlzU29tZWRheU1heWJlTm90ZSkge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICByZXR1cm4gYS5hY3Rpb25EYXRlIDwgYi5hY3Rpb25EYXRlID8gLTEgOiBhLmFjdGlvbkRhdGUgPiBiLmFjdGlvbkRhdGUgPyAxIDogMDtcbiAgfVxuXG4gIHByaXZhdGUgdG9nZ2xlVG9kbyh0b2RvOiBUb2RvSXRlbSk6IHZvaWQge1xuICAgIHRoaXMucHJvcHMudG9nZ2xlVG9kbyh0b2RvLCBUb2RvSXRlbVN0YXR1cy50b2dnbGVTdGF0dXModG9kby5zdGF0dXMpKTtcbiAgfVxuXG4gIHByaXZhdGUgb3BlbkZpbGUodG9kbzogVG9kb0l0ZW0pOiB2b2lkIHtcbiAgICB0aGlzLnByb3BzLm9wZW5GaWxlKHRvZG8uc291cmNlRmlsZVBhdGgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBUb2RvSXRlbSwgVG9kb0l0ZW1TdGF0dXMgfSBmcm9tICcuLi9tb2RlbC9Ub2RvSXRlbSc7XG5cbmV4cG9ydCBjbGFzcyBUb2RvUGFyc2VyIHtcbiAgYXN5bmMgcGFyc2VUYXNrcyhmaWxlUGF0aDogc3RyaW5nLCBmaWxlQ29udGVudHM6IHN0cmluZyk6IFByb21pc2U8VG9kb0l0ZW1bXT4ge1xuICAgIGNvbnN0IHBhdHRlcm4gPSAvKC18XFwqKSBcXFsoXFxzfHgpP1xcXVxccyguKikvZztcbiAgICByZXR1cm4gWy4uLmZpbGVDb250ZW50cy5tYXRjaEFsbChwYXR0ZXJuKV0ubWFwKCh0YXNrKSA9PiB0aGlzLnBhcnNlVGFzayhmaWxlUGF0aCwgdGFzaykpO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZVRhc2soZmlsZVBhdGg6IHN0cmluZywgZW50cnk6IFJlZ0V4cE1hdGNoQXJyYXkpOiBUb2RvSXRlbSB7XG4gICAgY29uc3QgdG9kb0l0ZW1PZmZzZXQgPSAyOyAvLyBTdHJpcCBvZmYgYC18KiBgXG4gICAgY29uc3Qgc3RhdHVzID0gZW50cnlbMl0gPT09ICd4JyA/IFRvZG9JdGVtU3RhdHVzLkRvbmUgOiBUb2RvSXRlbVN0YXR1cy5Ub2RvO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZW50cnlbM107XG5cbiAgICBjb25zdCBkYXRlUGF0dGVybiA9IC8jKFxcZHs0fS1cXGR7Mn0tXFxkezJ9KS9nO1xuICAgIGNvbnN0IHNvbWVkYXlQYXR0ZXJuID0gLyMoc29tZWRheSkvZztcbiAgICBjb25zdCBkYXRlTWF0Y2hlcyA9IGRlc2NyaXB0aW9uLm1hdGNoKGRhdGVQYXR0ZXJuKTtcbiAgICBjb25zdCBhY3Rpb25EYXRlID0gZGF0ZU1hdGNoZXMgIT0gbnVsbCA/IG5ldyBEYXRlKGRhdGVNYXRjaGVzWzBdPy5zdWJzdHJpbmcoMSkpIDogdW5kZWZpbmVkO1xuXG4gICAgcmV0dXJuIG5ldyBUb2RvSXRlbShcbiAgICAgIHN0YXR1cyxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgZGVzY3JpcHRpb24ubWF0Y2goc29tZWRheVBhdHRlcm4pICE9IG51bGwsXG4gICAgICBmaWxlUGF0aCxcbiAgICAgIChlbnRyeS5pbmRleCA/PyAwKSArIHRvZG9JdGVtT2Zmc2V0LFxuICAgICAgZW50cnlbMF0ubGVuZ3RoIC0gdG9kb0l0ZW1PZmZzZXQsXG4gICAgICBhY3Rpb25EYXRlLFxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFRBYnN0cmFjdEZpbGUsIFRGaWxlLCBWYXVsdCB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB7IFRvZG9JdGVtLCBUb2RvSXRlbVN0YXR1cyB9IGZyb20gJy4uL21vZGVsL1RvZG9JdGVtJztcbmltcG9ydCB7IFRvZG9QYXJzZXIgfSBmcm9tICcuLi9tb2RlbC9Ub2RvUGFyc2VyJztcblxuZXhwb3J0IGNsYXNzIFRvZG9JbmRleCB7XG4gIHByaXZhdGUgdmF1bHQ6IFZhdWx0O1xuICBwcml2YXRlIHRvZG9zOiBNYXA8c3RyaW5nLCBUb2RvSXRlbVtdPjtcbiAgcHJpdmF0ZSBsaXN0ZW5lcnM6ICgodG9kb3M6IFRvZG9JdGVtW10pID0+IHZvaWQpW107XG5cbiAgY29uc3RydWN0b3IodmF1bHQ6IFZhdWx0LCBsaXN0ZW5lcjogKHRvZG9zOiBUb2RvSXRlbVtdKSA9PiB2b2lkKSB7XG4gICAgdGhpcy52YXVsdCA9IHZhdWx0O1xuICAgIHRoaXMudG9kb3MgPSBuZXcgTWFwPHN0cmluZywgVG9kb0l0ZW1bXT4oKTtcbiAgICB0aGlzLmxpc3RlbmVycyA9IFtsaXN0ZW5lcl07XG4gIH1cblxuICBhc3luYyBpbml0aWFsaXplKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIFRPRE86IHBlcnNpc3QgaW5kZXggJiBsYXN0IHN5bmMgdGltZXN0YW1wOyBvbmx5IHBhcnNlIGZpbGVzIHRoYXQgY2hhbmdlZCBzaW5jZSB0aGVuLlxuICAgIGNvbnN0IHRvZG9NYXAgPSBuZXcgTWFwPHN0cmluZywgVG9kb0l0ZW1bXT4oKTtcbiAgICBsZXQgbnVtYmVyT2ZUb2RvcyA9IDA7XG4gICAgY29uc3QgdGltZVN0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICBjb25zdCBtYXJrZG93bkZpbGVzID0gdGhpcy52YXVsdC5nZXRNYXJrZG93bkZpbGVzKCk7XG4gICAgZm9yIChjb25zdCBmaWxlIG9mIG1hcmtkb3duRmlsZXMpIHtcbiAgICAgIGNvbnN0IHRvZG9zID0gYXdhaXQgdGhpcy5wYXJzZVRvZG9zSW5GaWxlKGZpbGUpO1xuICAgICAgbnVtYmVyT2ZUb2RvcyArPSB0b2Rvcy5sZW5ndGg7XG4gICAgICBpZiAodG9kb3MubGVuZ3RoID4gMCkge1xuICAgICAgICB0b2RvTWFwLnNldChmaWxlLnBhdGgsIHRvZG9zKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB0b3RhbFRpbWVNcyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGltZVN0YXJ0O1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYFtvYnNpZGlhbi1wbHVnaW4tdG9kb10gUGFyc2VkICR7bnVtYmVyT2ZUb2Rvc30gVE9ET3MgZnJvbSAke21hcmtkb3duRmlsZXMubGVuZ3RofSBtYXJrZG93biBmaWxlcyBpbiAoJHtcbiAgICAgICAgdG90YWxUaW1lTXMgLyAxMDAwLjBcbiAgICAgIH1zKWAsXG4gICAgKTtcbiAgICB0aGlzLnRvZG9zID0gdG9kb01hcDtcbiAgICB0aGlzLnJlZ2lzdGVyRXZlbnRIYW5kbGVycygpO1xuICAgIHRoaXMuaW52b2tlTGlzdGVuZXJzKCk7XG4gIH1cblxuICBzZXRTdGF0dXModG9kbzogVG9kb0l0ZW0sIG5ld1N0YXR1czogVG9kb0l0ZW1TdGF0dXMpOiB2b2lkIHtcbiAgICBjb25zdCBmaWxlID0gdGhpcy52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgodG9kby5zb3VyY2VGaWxlUGF0aCkgYXMgVEZpbGU7XG4gICAgY29uc3QgZmlsZUNvbnRlbnRzID0gdGhpcy52YXVsdC5yZWFkKGZpbGUpO1xuICAgIGZpbGVDb250ZW50cy50aGVuKChjOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IG5ld1RvZG8gPSBgWyR7bmV3U3RhdHVzID09PSBUb2RvSXRlbVN0YXR1cy5Eb25lID8gJ3gnIDogJyAnfV0gJHt0b2RvLmRlc2NyaXB0aW9ufWA7XG4gICAgICBjb25zdCBuZXdDb250ZW50cyA9IGMuc3Vic3RyaW5nKDAsIHRvZG8uc3RhcnRJbmRleCkgKyBuZXdUb2RvICsgYy5zdWJzdHJpbmcodG9kby5zdGFydEluZGV4ICsgdG9kby5sZW5ndGgpO1xuICAgICAgdGhpcy52YXVsdC5tb2RpZnkoZmlsZSwgbmV3Q29udGVudHMpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBpbmRleEFic3RyYWN0RmlsZShmaWxlOiBUQWJzdHJhY3RGaWxlKSB7XG4gICAgaWYgKCEoZmlsZSBpbnN0YW5jZW9mIFRGaWxlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmluZGV4RmlsZShmaWxlIGFzIFRGaWxlKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5kZXhGaWxlKGZpbGU6IFRGaWxlKSB7XG4gICAgdGhpcy5wYXJzZVRvZG9zSW5GaWxlKGZpbGUpLnRoZW4oKHRvZG9zKSA9PiB7XG4gICAgICB0aGlzLnRvZG9zLnNldChmaWxlLnBhdGgsIHRvZG9zKTtcbiAgICAgIHRoaXMuaW52b2tlTGlzdGVuZXJzKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNsZWFySW5kZXgocGF0aDogc3RyaW5nLCBzaWxlbnQgPSBmYWxzZSkge1xuICAgIHRoaXMudG9kb3MuZGVsZXRlKHBhdGgpO1xuICAgIGlmICghc2lsZW50KSB7XG4gICAgICB0aGlzLmludm9rZUxpc3RlbmVycygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgcGFyc2VUb2Rvc0luRmlsZShmaWxlOiBURmlsZSk6IFByb21pc2U8VG9kb0l0ZW1bXT4ge1xuICAgIC8vIFRPRE86IERvZXMgaXQgbWFrZSBzZW5zZSB0byBpbmRleCBjb21wbGV0ZWQgVE9ET3MgYXQgYWxsP1xuICAgIGNvbnN0IHRvZG9QYXJzZXIgPSBuZXcgVG9kb1BhcnNlcigpO1xuICAgIGNvbnN0IGZpbGVDb250ZW50cyA9IGF3YWl0IHRoaXMudmF1bHQuY2FjaGVkUmVhZChmaWxlKTtcbiAgICByZXR1cm4gdG9kb1BhcnNlclxuICAgICAgLnBhcnNlVGFza3MoZmlsZS5wYXRoLCBmaWxlQ29udGVudHMpXG4gICAgICAudGhlbigodG9kb3MpID0+IHRvZG9zLmZpbHRlcigodG9kbykgPT4gdG9kby5zdGF0dXMgPT09IFRvZG9JdGVtU3RhdHVzLlRvZG8pKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVnaXN0ZXJFdmVudEhhbmRsZXJzKCkge1xuICAgIHRoaXMudmF1bHQub24oJ2NyZWF0ZScsIChmaWxlOiBUQWJzdHJhY3RGaWxlKSA9PiB7XG4gICAgICB0aGlzLmluZGV4QWJzdHJhY3RGaWxlKGZpbGUpO1xuICAgIH0pO1xuICAgIHRoaXMudmF1bHQub24oJ21vZGlmeScsIChmaWxlOiBUQWJzdHJhY3RGaWxlKSA9PiB7XG4gICAgICB0aGlzLmluZGV4QWJzdHJhY3RGaWxlKGZpbGUpO1xuICAgIH0pO1xuICAgIHRoaXMudmF1bHQub24oJ2RlbGV0ZScsIChmaWxlOiBUQWJzdHJhY3RGaWxlKSA9PiB7XG4gICAgICB0aGlzLmNsZWFySW5kZXgoZmlsZS5wYXRoKTtcbiAgICB9KTtcbiAgICAvLyBXZSBjb3VsZCBzaW1wbHkgY2hhbmdlIHRoZSByZWZlcmVuY2VzIHRvIHRoZSBvbGQgcGF0aCwgYnV0IHBhcnNpbmcgYWdhaW4gZG9lcyB0aGUgdHJpY2sgYXMgd2VsbFxuICAgIHRoaXMudmF1bHQub24oJ3JlbmFtZScsIChmaWxlOiBUQWJzdHJhY3RGaWxlLCBvbGRQYXRoOiBzdHJpbmcpID0+IHtcbiAgICAgIHRoaXMuY2xlYXJJbmRleChvbGRQYXRoKTtcbiAgICAgIHRoaXMuaW5kZXhBYnN0cmFjdEZpbGUoZmlsZSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGludm9rZUxpc3RlbmVycygpIHtcbiAgICBjb25zdCB0b2RvcyA9IChbXSBhcyBUb2RvSXRlbVtdKS5jb25jYXQoLi4uQXJyYXkuZnJvbSh0aGlzLnRvZG9zLnZhbHVlcygpKSk7XG4gICAgdGhpcy5saXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIpID0+IGxpc3RlbmVyKHRvZG9zKSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEFwcCwgUGx1Z2luLCBQbHVnaW5NYW5pZmVzdCwgVEZpbGUsIFdvcmtzcGFjZUxlYWYgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgeyBWSUVXX1RZUEVfVE9ETyB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IFRvZG9JdGVtVmlldywgVG9kb0l0ZW1WaWV3UHJvcHMgfSBmcm9tICcuL3VpL1RvZG9JdGVtVmlldyc7XG5pbXBvcnQgeyBUb2RvSXRlbSwgVG9kb0l0ZW1TdGF0dXMgfSBmcm9tICcuL21vZGVsL1RvZG9JdGVtJztcbmltcG9ydCB7IFRvZG9JbmRleCB9IGZyb20gJy4vbW9kZWwvVG9kb0luZGV4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9kb1BsdWdpbiBleHRlbmRzIFBsdWdpbiB7XG4gIHByaXZhdGUgdG9kb0luZGV4OiBUb2RvSW5kZXg7XG4gIHByaXZhdGUgdmlldzogVG9kb0l0ZW1WaWV3O1xuXG4gIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBtYW5pZmVzdDogUGx1Z2luTWFuaWZlc3QpIHtcbiAgICBzdXBlcihhcHAsIG1hbmlmZXN0KTtcbiAgICB0aGlzLnRvZG9JbmRleCA9IG5ldyBUb2RvSW5kZXgodGhpcy5hcHAudmF1bHQsIHRoaXMudGljay5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGFzeW5jIG9ubG9hZCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLnJlZ2lzdGVyVmlldyhWSUVXX1RZUEVfVE9ETywgKGxlYWY6IFdvcmtzcGFjZUxlYWYpID0+IHtcbiAgICAgIGNvbnN0IHRvZG9zOiBUb2RvSXRlbVtdID0gW107XG4gICAgICBjb25zdCBwcm9wcyA9IHtcbiAgICAgICAgdG9kb3M6IHRvZG9zLFxuICAgICAgICBvcGVuRmlsZTogKGZpbGVQYXRoOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBjb25zdCBmaWxlID0gdGhpcy5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKGZpbGVQYXRoKSBhcyBURmlsZTtcbiAgICAgICAgICB0aGlzLmFwcC53b3Jrc3BhY2Uuc3BsaXRBY3RpdmVMZWFmKCkub3BlbkZpbGUoZmlsZSk7XG4gICAgICAgIH0sXG4gICAgICAgIHRvZ2dsZVRvZG86ICh0b2RvOiBUb2RvSXRlbSwgbmV3U3RhdHVzOiBUb2RvSXRlbVN0YXR1cykgPT4ge1xuICAgICAgICAgIHRoaXMudG9kb0luZGV4LnNldFN0YXR1cyh0b2RvLCBuZXdTdGF0dXMpO1xuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIHRoaXMudmlldyA9IG5ldyBUb2RvSXRlbVZpZXcobGVhZiwgcHJvcHMpO1xuICAgICAgcmV0dXJuIHRoaXMudmlldztcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLmFwcC53b3Jrc3BhY2UubGF5b3V0UmVhZHkpIHtcbiAgICAgIHRoaXMuaW5pdExlYWYoKTtcbiAgICAgIGF3YWl0IHRoaXMucHJlcGFyZUluZGV4KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCh0aGlzLmFwcC53b3Jrc3BhY2Uub24oJ2xheW91dC1yZWFkeScsIHRoaXMuaW5pdExlYWYuYmluZCh0aGlzKSkpO1xuICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KHRoaXMuYXBwLndvcmtzcGFjZS5vbignbGF5b3V0LXJlYWR5JywgYXN5bmMgKCkgPT4gYXdhaXQgdGhpcy5wcmVwYXJlSW5kZXgoKSkpO1xuICAgIH1cbiAgfVxuXG4gIG9udW5sb2FkKCk6IHZvaWQge1xuICAgIHRoaXMuYXBwLndvcmtzcGFjZS5nZXRMZWF2ZXNPZlR5cGUoVklFV19UWVBFX1RPRE8pLmZvckVhY2goKGxlYWYpID0+IGxlYWYuZGV0YWNoKCkpO1xuICB9XG5cbiAgaW5pdExlYWYoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYXBwLndvcmtzcGFjZS5nZXRMZWF2ZXNPZlR5cGUoVklFV19UWVBFX1RPRE8pLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0UmlnaHRMZWFmKGZhbHNlKS5zZXRWaWV3U3RhdGUoe1xuICAgICAgdHlwZTogVklFV19UWVBFX1RPRE8sXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBwcmVwYXJlSW5kZXgoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy50b2RvSW5kZXguaW5pdGlhbGl6ZSgpO1xuICB9XG5cbiAgdGljayh0b2RvczogVG9kb0l0ZW1bXSk6IHZvaWQge1xuICAgIHRoaXMudmlldy5zZXRQcm9wcygoY3VycmVudFByb3BzOiBUb2RvSXRlbVZpZXdQcm9wcykgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uY3VycmVudFByb3BzLFxuICAgICAgICB0b2RvczogdG9kb3MsXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOlsiSXRlbVZpZXciLCJNYXJrZG93blJlbmRlcmVyIiwiVEZpbGUiLCJQbHVnaW4iXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBdURBO0FBQ08sU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFO0FBQzdELElBQUksU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxLQUFLLFlBQVksQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0FBQ2hILElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQy9ELFFBQVEsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUNuRyxRQUFRLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FB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
