export async function reachFilesFromDataTransfer(data: DataTransferItem): Promise<File[]> {
  if (typeof data.webkitGetAsEntry !== "function") {
    const file = data.getAsFile();
    return file ? [file] : [];
  }

  const entry = data.webkitGetAsEntry();
  if (!entry) return [];
  const entryContent = await readEntryContentAsync(entry);

  return entryContent;
}

function readEntryContentAsync(entry: FileSystemEntry): Promise<File[]> {
  return new Promise((resolve) => {
    let reading = 0;
    const contents: File[] = [];

    readEntry(entry);

    // TODO: Настроить типизацию. (не знаю как)
    function readEntry(entry: any) {
      if (entry.isFile) {
        reading++;
        entry.file((file: File) => {
          reading--;
          contents.push(file);

          if (reading === 0) resolve(contents);
        });
      } else if (entry.isDirectory) {
        readReaderContent(entry.createReader());
      }
    }

    function readReaderContent(reader: any) {
      reading++;
      reader.readEntries(function (entries: any) {
        reading--;
        for (const entry of entries) {
          readEntry(entry);
        }
        if (reading === 0) resolve(contents);
      });
    }
  });
}
