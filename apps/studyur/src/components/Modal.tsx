import { Accessor, Component } from "solid-js";

const Modal: Component<{
  open: Accessor<boolean>;
  onClose: (approve: boolean) => void;
}> = ({ open, onClose, children }) => {
  return (
    <div
      class="fixed z-10 inset-0 overflow-y-auto"
      classList={{
        "pointer-events-none": !open(),
      }}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          class={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ease-in-out duration-300 opacity-${
            open() ? 100 : 0
          }`}
          aria-hidden="true"
        ></div>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full ease-in-out"
          classList={{
            "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95": !open(),
            "opacity-100 translate-y-0 sm:scale-100": open(),
          }}
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">{children}</div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={() => onClose(true)}
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Ok
            </button>
            <button
              onClick={() => onClose(false)}
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
