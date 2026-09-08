import * as React from "react";
import { useState, useEffect } from 'react';
import { Dialog } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Minus, Plus } from "lucide-react";
import "./EditJobDialog.css";
import { getRequirementsByJobId } from "../../API/RequirementAPI";
import { getCategories } from "../../API/CategoriesAPI";


export default function EditJobDialog({ job }) {

	const [requirement, setRequirement] = useState([]);
	const [categories, setCategories] = useState([]);
	const [category, setCategory] = useState(job?.jobCategory?.job_category_id || '');
	useEffect(() => {
		getRequirementsByJobId(job?.job_offer_id)
		.then(res => setRequirement(res?.data || []))
		.catch(err => console.log('error', err))
	}, [job?.job_offer_id])

	useEffect(() => {
		getCategories()
		.then(res => setCategories(res?.data || []))
		.catch(err => console.log('error', err));
	}, [])

	useEffect(() => {
		setCategory(job?.jobCategory?.job_category_id || '');
	}, [job?.category]);

	const handleAddRequirement = () => {
		setRequirement((previousRequirements) => [
			...previousRequirements,
			{ requirement_id: `new-${Date.now()}`, requirement: '' }
		]);
	};

	const handleRemoveRequirement = (requirementId) => {
		setRequirement((previousRequirements) => previousRequirements.filter(
			(item) => item.requirement_id !== requirementId
		));
	};

	const handleRequirementChange = (requirementId, value) => {
		setRequirement((previousRequirements) => previousRequirements.map((item) => (
			item.requirement_id === requirementId
				? { ...item, requirement: value }
				: item
		)));
	};
    return (
        <Dialog.Root>
		<Dialog.Trigger asChild>
			<button className="Button edit-job-trigger">View job</button>
		</Dialog.Trigger>
		<Dialog.Portal>
			<Dialog.Overlay className="DialogOverlay" />
			<Dialog.Content className="DialogContent">
				<Dialog.Close asChild>
					<button className="IconButton" aria-label="Close">
						<Cross2Icon />
					</button>
				</Dialog.Close>
				<div className="DialogScrollContent">
				<Dialog.Title className="DialogTitle">Edit job</Dialog.Title>
				<Dialog.Description className="DialogDescription">
					Update the details of this job offer, then save your changes.
				</Dialog.Description>
				<fieldset className="Fieldset">
						<label className="Label" htmlFor="job-title">
						Job title
					</label>
						<input className="Input" id="job-title" defaultValue={ job?.title } />
				</fieldset>
				<fieldset className="Fieldset">
						<label className="Label" htmlFor="job-category">
						Category
					</label>
							<select
								className="Input category-select"
								id="job-category"
								value={category}
								onChange={(event) => setCategory(event.target.value)}
							>
								<option value="">Choose a category</option>
								{categories.map((item) => (
									<option key={item.job_category_id} value={item.job_category_id}>
										{item.category_name}
									</option>
								))}
							</select>
				</fieldset>
				<fieldset className="Fieldset">
						<label className="Label" htmlFor="job-category">
						Description
					</label>
						<input className="Input" id="job-category" defaultValue={ job?.description } />
				</fieldset>
				<fieldset className="Fieldset">
						<label className="Label" htmlFor="job-category">
						Location
					</label>
						<input className="Input" id="job-category" defaultValue={ job?.location } />
				</fieldset>
				<fieldset className="Fieldset requirements-fieldset">
						<label className="Label" htmlFor="job-category">
						Requirements
					</label>
					<div className="requirements-list">
						{requirement.map((item) => (
							<div className="requirement-row" key={item.requirement_id}>
								<input
									className="Input"
									id={`requirement-${item.requirement_id}`}
									value={item.requirement || ''}
									onChange={(event) => handleRequirementChange(item.requirement_id, event.target.value)}
								/>
								<button
									type="button"
									className="requirement-icon-button remove-requirement-button"
									onClick={() => handleRemoveRequirement(item.requirement_id)}
									aria-label="Remove requirement"
								>
									<Minus size={16} />
								</button>
							</div>
						))}
						<button
							type="button"
							className="requirement-icon-button add-requirement-button"
							onClick={handleAddRequirement}
							aria-label="Add requirement"
						>
							<Plus size={16} />
						</button>
					</div>
				</fieldset>
				<div
					style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
				>
					<Dialog.Close asChild>
						<button className="Button save-job-button">Save changes</button>
					</Dialog.Close>
				</div>
				</div>
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
);
}