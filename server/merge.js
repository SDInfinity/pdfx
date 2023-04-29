import pdfMerger from "pdf-merger-js";
import fs from "fs";

const merger = new pdfMerger();

export const pdfmerger = async (p1,p2)=>{
        const mergedFilePath = 'merged/merged.pdf';

  // Remove the previously merged file
  if (fs.existsSync(mergedFilePath)) {
    fs.unlinkSync(mergedFilePath);
  }
  await merger.add(p1); // Add the first PDF
  await merger.add(p2); // Add the second PDF

  await merger.save(mergedFilePath); // Save the merged PDF

  merger.reset();
};

