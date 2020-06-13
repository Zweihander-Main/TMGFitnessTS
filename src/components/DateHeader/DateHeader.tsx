import React from 'react';
import { DateHeaderText } from './styles';

interface DateHeaderProps {
	date: string;
}

const DateHeader: React.FC<DateHeaderProps> = ({ date }) => {
	return <DateHeaderText>{date}</DateHeaderText>;
};

export default DateHeader;
