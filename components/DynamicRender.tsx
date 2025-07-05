'use client';

import { useState } from 'react';

type JSONValue = string | number | boolean | null | JSONArray | JSONObject;
interface JSONObject { [key: string]: JSONValue }
interface JSONArray extends Array<JSONValue> {}

interface Props {
  data: JSONValue;
  name?: string;
  level?: number;
}

export default function DynamicRender({ data, name, level = 0 }: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  const indentStyle = {
    paddingLeft: `${level * 16}px`,
  };

  // Primitive value
  if (typeof data !== 'object' || data === null) {
    return (
      <div style={indentStyle} className="py-1">
        {name && <span className="text-blue-600 font-medium">{name}: </span>}
        <span className="text-gray-800">{JSON.stringify(data)}</span>
      </div>
    );
  }

  // Array
  if (Array.isArray(data)) {
    return (
      <div style={indentStyle} className="py-1">
        <div
          onClick={toggle}
          className="cursor-pointer text-yellow-500 font-semibold select-none"
        >
          {name ? `${isOpen ? '▼' : '▶'} ${name} [${data.length}]` : `[Array]`}
        </div>
        {isOpen && (
          <div className="ml-4 border-l border-yellow-300 pl-2">
            {data.length === 0 ? (
              <div className="text-gray-400 italic">[empty array]</div>
            ) : (
              data.map((item, idx) => (
                <DynamicRender
                  key={idx}
                  data={item}
                  name={`[${idx}]`}
                  level={level + 1}
                />
              ))
            )}
          </div>
        )}
      </div>
    );
  }

  // Object
  return (
    <div style={indentStyle} className="py-1">
      {name && (
        <div
          onClick={toggle}
          className="cursor-pointer text-green-600 font-semibold select-none"
        >
          {isOpen ? '▼' : '▶'} {name}
        </div>
      )}
      {isOpen && (
        <div className="ml-4 border-l border-green-300 pl-2">
          {Object.keys(data).length === 0 ? (
            <div className="text-gray-400 italic">[empty object]</div>
          ) : (
            Object.entries(data).map(([key, value]) => (
              <DynamicRender
                key={key}
                data={value}
                name={key}
                level={level + 1}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
