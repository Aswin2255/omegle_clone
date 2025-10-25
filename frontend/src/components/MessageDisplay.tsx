import usechatStore from "../zustand/store";

export default function MessageDisplay() {
  const { allMessages } = usechatStore();

  return (
    <div className="">
      <div className="max-w-4xl mx-auto px-4">
        <div className="space-y-3">
          {/* Sample User Messages */}
          {allMessages.map((message: any, index: number) => {
            return (
              <>
                {message.role === "sender" ? (
                  <>
                    <div key={index} className="flex justify-end">
                      <div className="bg-blue-500 text-white px-4 py-2 rounded-lg max-w-xs">
                        <p className="text-sm">{message.message}</p>
                        <p className="text-xs text-blue-200 mt-1">
                          {message.user}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div key={index} className="flex justify-start">
                      <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg max-w-xs">
                        <p className="text-sm">{message.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {message.user}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
