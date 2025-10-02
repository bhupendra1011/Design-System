"use client";

import React, { useState, useEffect } from 'react';
import { Modal } from '@pd/ui/modal';
import { Input } from '@pd/ui/input';
import { Badge } from '@pd/ui/badge';
import { Text } from '@pd/ui/text';
import { updateIssue } from './actions';
import type { Card } from './data';
import { Button } from '@pd/ui/button';
import { BacklogIcon, PriorityIcon, AssigneeIcon, LabelIcon } from '@pd/icons';

interface UpdateIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: Card;
  columnId: string;
  onIssueUpdated?: (updatedCard: Card) => void;
}

const badgeOptions = [
  { id: 'backlog', label: 'Backlog', icon: <BacklogIcon size={12} /> },
  { id: 'priority', label: 'Priority', icon: <PriorityIcon size={12} /> },
  { id: 'assignee', label: 'Assignee', icon: <AssigneeIcon size={12} /> },
  { id: 'label', label: 'Label', icon: <LabelIcon size={12} /> },
];

export function UpdateIssueModal({ isOpen, onClose, card, columnId, onIssueUpdated }: UpdateIssueModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<string>('');
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [assignee, setAssignee] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with card data when modal opens or card changes
  useEffect(() => {
    if (card) {
      setTitle(card.title);
      setDescription(card.content);
      // Reset other fields - in a real app, these would come from the card data
      setSelectedPriority('');
      setSelectedLabels([]);
      setAssignee('');
    }
  }, [card]);

  const handleClose = () => {
    // Reset form to original card data
    if (card) {
      setTitle(card.title);
      setDescription(card.content);
      setSelectedPriority('');
      setSelectedLabels([]);
      setAssignee('');
    }
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
    if (!title.trim() || !card) return;

    setIsSubmitting(true);
    try {
      const updatedCard = await updateIssue(card.id, {
        title: title.trim(),
        content: description.trim(),
        priority: selectedPriority,
        labels: selectedLabels,
        assignee: assignee.trim(),
      });
      
      if (updatedCard && onIssueUpdated) {
        onIssueUpdated(updatedCard);
      }
      
      handleClose();
    } catch (error) {
      console.error('Error updating issue:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = title.trim() && !isSubmitting;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Update issue"
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
              tabIndex={0}
              role="button"
              onClick={() => {
                // handle badge click actions here
                console.log(`Selected ${badge.label}`);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  console.log(`Selected ${badge.label}`);
                }
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
            {isSubmitting ? 'Updating...' : 'Update issue'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}