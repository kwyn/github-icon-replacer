const requestReviewImage = chrome.extension.getURL("images/please.png");
// no need for waiting for the DOM with chrome extensions apparently
// https://stackoverflow.com/questions/5113318/in-a-chrome-extension-content-script-must-i-wait-for-document-ready-before-proc

function getFirstBranchActionItemIcon() {
  const branchIcons = document.getElementsByClassName(
    "branch-action-item-icon"
  );
  return branchIcons[0];
}

function getFirstActionItem() {
  const branchActionItems = document.getElementsByClassName(
    "branch-action-item"
  );
  return branchActionItems[0];
}

function replaceSummaryIcons() {
  const firstBranchIcon = getFirstBranchActionItemIcon();
  if (firstBranchIcon && firstBranchIcon.className.indexOf("error") > -1) {
    firstBranchIcon.setAttribute("style", "background-color: transparent;");
    firstBranchIcon.innerHTML =
      '<img width="30px" height="30px" src="' + requestReviewImage + '"></img>';
  }

  const firstItem = getFirstActionItem();
  if (firstItem) {
    const actionItemTitle = firstItem.getElementsByClassName(
      "status-heading"
    )[0];
    actionItemTitle.classList.remove("text-red");
  }
}

function getRejectionIcons() {
  const rejectionCases = document.getElementsByClassName("is-rejected");
  if (rejectionCases.length === 0) {
    return [];
  }
  return Array.from(rejectionCases).map(rejection => {
    return rejection.getElementsByClassName("discussion-item-icon")[0];
  });
}

function replaceCommentIcons() {
  getRejectionIcons().map(icon => {
    icon.setAttribute("style", "background-color: transparent;");
    icon.innerHTML =
      '<img width="30px" height="30px" src="' + requestReviewImage + '"></img>';
  });
}

// run replacers
replaceSummaryIcons();
replaceCommentIcons();
