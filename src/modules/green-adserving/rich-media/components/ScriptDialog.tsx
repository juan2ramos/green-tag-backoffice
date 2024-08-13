import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Row } from '@tanstack/react-table';

import { CodeBracketIcon } from '@heroicons/react/20/solid';
import { RichMediaInterface } from '../interfaces/rich-media.interface';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CodeBasic } from '@/components/ui/code';
interface CheckboxCellProps {
  richMediaData: Row<RichMediaInterface>;
}

export const ScriptDialog = ({ richMediaData }: CheckboxCellProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const codeString = `<script type="application/javascript"   src="https://ads.green-tag.io/adscript.min.js"  async  >
</script>
    <div id="ad-container"></div>
    <script type="application/javascript">
      var s3AdLoader = s3AdLoader || [];
      s3AdLoader.push(function () {
        s3AdTag({
          tagId: "ad-container",
          adUrl: "${richMediaData.original.url}",
        });
      });
    </script>`;
  return (
    <>
      <div className="text-center">
        <CodeBracketIcon
          onClick={() => setDialogOpen(true)}
          className="h-5 w-5  mx-auto"
        />
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-5xl">
          <DialogHeader className="font-[700] text-[16px] text-center">
            <DialogTitle>
              Script {richMediaData.getValue('richMediaName')}
            </DialogTitle>
            <hr />
          </DialogHeader>
          <DialogDescription> </DialogDescription>
          <CodeBasic codeBlock={codeString} />

          <DialogFooter className="mt-4">
            <Button onClick={() => setDialogOpen(false)} variant="secondary">
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
