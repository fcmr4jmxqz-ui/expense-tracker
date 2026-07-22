export function downloadFile(
  content: string,
  fileName: string,
  fileType: string,
) {
  const blob = new Blob([content], {
    type: fileType,
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = fileName;

  link.click();

  URL.revokeObjectURL(url);
}
