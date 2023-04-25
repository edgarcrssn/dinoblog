import React, { useState } from 'react';
import { Form, Input, Select } from 'antd';
import { Diet, Era } from '@prisma/client';
import { capitalize } from '@/utils/capitalize';

interface Props {
  nameFilter: string;
  setNameFilter: React.Dispatch<React.SetStateAction<string>>;
  dietFilter?: string;
  setDietFilter: React.Dispatch<React.SetStateAction<string | undefined>>;
  eraFilter?: string;
  setEraFilter: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const DinosaursFilterBar = ({
  nameFilter,
  setNameFilter,
  dietFilter,
  setDietFilter,
  eraFilter,
  setEraFilter,
}: Props) => {
  return (
    <Form layout="inline">
      <Form.Item label="Name">
        <Input
          placeholder="filter by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Diet">
        <Select
          placeholder="filter by diet"
          style={{ width: '150px' }}
          value={dietFilter}
          onChange={(value) => setDietFilter(value)}
          allowClear
        >
          {Object.values(Diet).map((diet) => (
            <Select.Option key={diet} value={diet}>
              {capitalize(diet)}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Era">
        <Select
          placeholder="filter by era"
          style={{ width: '150px' }}
          value={eraFilter}
          onChange={(value) => setEraFilter(value)}
          allowClear
        >
          {Object.values(Era).map((era) => (
            <Select.Option key={era} value={era}>
              {capitalize(era)}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default DinosaursFilterBar;
