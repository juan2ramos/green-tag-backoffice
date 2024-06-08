import { useRef, useState } from 'react';
import { useForm } from '@/shared/hooks/useForm';
import { createProject, getProject } from '@/services/project';
import { useQueryClient } from '@tanstack/react-query';

const CreateProject = () => {
  const [fileName, setFileName] = useState('');
  const [status, setStatus] = useState({
    loading: false,
    error: false,
    success: false,
  });
  const fileInputRef = useRef(null);
  const { onInputChange, formState, onResetForm } = useForm({
    name: '',
    url: '',
    file: {},
  });
  const queryClient = useQueryClient();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    setFileName(file ? file.name : '');
    if (event === undefined || file === undefined) {
      return;
    }
    onInputChange(event);
  };

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({ error: false, success: false, loading: true });

    try {
      await createProject(formState);
      setStatus({ ...status, success: true, loading: false });
      onResetForm();
      if (fileInputRef.current) {
        setFileName('');
        (fileInputRef.current as HTMLInputElement).value = '';
      }
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.prefetchQuery({
        queryKey: ['projects'],
        queryFn: getProject,
      });
    } catch (error) {
      setStatus({ ...status, error: true, loading: false });
      console.error('Error creating project', JSON.stringify(error));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="bg-white p-8 rounded-xl ">
        <h2>Agregar un proyecto</h2>
        <hr />
        {status.error && (
          <div className="text-red-500 mt-4">
            Error al crear el proyecto, por favor intenta de nuevo.
          </div>
        )}

        <form className="pt-4 flex flex-col gap-4" onSubmit={onFormSubmit}>
          <div className="flex gap-4">
            <div className="w-1/3">
              <input
                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#4A9A81]"
                type="text"
                placeholder="Ingresa el nombre del proyecto"
                name="name"
                value={formState.name}
                onChange={onInputChange}
              />
            </div>
            <div className="w-1/3">
              <input
                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#4A9A81]"
                type="url"
                placeholder="Ingresa la url del del proyecto"
                name="url"
                onChange={onInputChange}
                value={formState.url}
              />
            </div>
            <div className="w-1/3 relative flex items-center gap-2">
              <input
                name="file"
                type="file"
                className="opacity-0 absolute w-full h-full"
                id="file-upload"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-white border-2 border-[#44c949] text-[#44c949] py-2 px-4 rounded inline-block"
              >
                Logo del proyecto
              </label>
              {fileName && (
                <div className="mt-2 text-sm text-gray-600">{fileName}</div>
              )}
            </div>
          </div>
          <div className="flex justify-center w-full mt-6">
            <button
              disabled={status.loading}
              type="submit"
              className={
                status.loading
                  ? 'bg-[#a0a0a0] cursor-not-allowed text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center w-1/3 justify-center gap-2 '
                  : 'bg-[#44c949] hover:bg-[#4ada4f] text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center w-1/3 justify-center gap-2 '
              }
            >
              {status.loading ? 'Creando proyecto...' : 'Crear Proyecto '}

              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CreateProject;
