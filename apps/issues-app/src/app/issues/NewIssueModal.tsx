"use client";

import React, { useState } from 'react';
import { Modal } from '@pd/ui/modal';
import { Input } from '@pd/ui/input';
import { Badge } from '@pd/ui/badge';
import { Text } from '@pd/ui/text';
import { createIssue } from './actions';
import type { Card } from './data';
import { Button } from '@pd/ui/button';
import { BacklogIcon, PriorityIcon, AssigneeIcon, LabelIcon } from '@pd/icons';

interface NewIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  columnId: string;
  columnTitle: string;
  onIssueCreated?: (card: Card) => void;
}



const badgeOptions = [
  { id: 'backlog', label: 'Backlog', icon: <BacklogIcon size={12} /> },
  { id: 'priority', label: 'Priority', icon: <PriorityIcon size={12} /> },
  { id: 'assignee', label: 'Assignee', icon: <AssigneeIcon size={12} /> },
  { id: 'label', label: 'Label', icon: <LabelIcon size={12} /> },
];

export function NewIssueModal({ isOpen, onClose, columnId, columnTitle, onIssueCreated }: NewIssueModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<string>('');
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [assignee, setAssignee] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setSelectedPriority('');
    setSelectedLabels([]);
    setAssignee('');
    onClose();
  };

  const handleLabelToggle = (labelId: string) => {
    setSelectedLabels(prev => 
      prev.includes(labelId) 
        ? prev.filter(id => id !== labelId)
        : [...prev, labelId]
    );
  };

  const handleSubmit = async () => {
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      const newCard = await createIssue({
        title: title.trim(),
        content: description.trim(),
        columnId,
        priority: selectedPriority,
        labels: selectedLabels,
        assignee: assignee.trim(),
      });
      
      // Call the callback to update parent component state
      if (onIssueCreated) {
        onIssueCreated(newCard);
      }
      
      handleClose();
    } catch (error) {
      console.error('Error creating issue:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = title.trim() && !isSubmitting;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="New issue"
      
    >
      <div className="space-y-2">
        {/* Title Input */}
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Issue title"
          className='!border-0'
          style={{
            fontSize: 'var(--typography-font-size-title)',
            fontWeight: 'var(--typography-font-weight-medium)'
          }}
          required
        />

        {/* Description Input */}
        <Input
          type="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description..."
          rows={4}
           className='!border-0'
          style={{
            fontSize: 'var(--typography-font-size-small)',
            fontWeight: 'var(--typography-font-weight-medium)'
          }}
        />

        {/* Badge Selection */}
        <div className="flex gap-2 py-4 border-b border-badge">
          {badgeOptions.map((badge) => (
            <Badge 
              key={badge.id}
              leftIcon={badge.icon}
              onClick={() => {
                // handle badge click actions here
                console.log(`Selected ${badge.label}`);
              }}
            >
              {badge.label}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <Button 
            onClick={handleClose} 
            variant="outline"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            variant="primary"
            disabled={!canSubmit}
          >
            {isSubmitting ? 'Creating...' : 'Create issue'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}