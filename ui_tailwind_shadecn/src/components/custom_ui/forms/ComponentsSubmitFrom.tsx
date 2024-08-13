import React from 'react';
import { Formik, Field, Form, ErrorMessage, FieldProps } from 'formik';
import * as Yup from 'yup';
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { useCreateComponentsStore } from '@/store/createComponents/create.components';
import { useCategories } from '@/hooks/useCategories';

import {
  Select as CnSelect,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const formSchema = Yup.object().shape({
  title: Yup.string().min(5, "Title must be at least 5 characters.").required("Title is required."),
  description: Yup.string().min(5, "Description must be at least 5 characters.").required("Description is required."),
  html: Yup.string().min(1, "HTML is required.").required("HTML is required."),
  css: Yup.string().min(1, "CSS is required.").required("CSS is required."),
  javascript: Yup.string().min(1, "JavaScript is required.").required("JavaScript is required."),
  categories: Yup.array().of(Yup.string().required()).min(1, "Categories are required.").required("Categories are required."),
  tags: Yup.array().of(Yup.string().required()).min(1, "Tags are required.").required("Tags are required."),
  folder_name: Yup.string().min(5, "Folder name must be at least 5 characters.").required("Folder name is required."),
  type: Yup.string().min(1, "Type is required.").required("Type is required."),
});

interface FormValues {
  html: string;
  css: string;
  javascript: string;
  categories: string;
  tags: Array<string>;
  folder_name: string;
  title: string;
  description: string;
}

interface CreateComponents {
  title: string,
  description: string,
  html: string;
  css: string;
  javascript: string;
  categories: string;
  tags: Array<string>;
  folder_path: string;
  folder_name: string;
  isActive: boolean;
}

// TODO: Update this dynamically or get it from users
const tagsOptions = [
  { value: 'buttons', label: 'buttons' },
  { value: 'cards', label: 'cards' },
  { value: 'inputs', label: 'inputs' },
];

const MultiSelectField = ({ field, form, options }: FieldProps & { options: { value: string, label: string }[] }) => {
  const setTags = useCreateComponentsStore((state) => state.setTags);
  const onChange = (value: string) => {
    setTags(value);
    const newValue = field.value.includes(value)
      ? field.value.filter((v: string) => v !== value)
      : [...field.value, value];
    form.setFieldValue(field.name, newValue);
  };

  const selectedOptions = options.filter(option => field.value.includes(option.value));

  return (
    <div>
      <CnSelect onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue>
            {selectedOptions.length > 0 ? (
              selectedOptions.map(option => (
                <Badge key={option.value} className="mr-2">{option.label}</Badge>
              ))
            ) : (
              <span>Select options</span>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </CnSelect>
      <input type="hidden" {...field} />
    </div>
  );
};

export function ProfileForm() {
  const viewCreateComponentsStore = useCreateComponentsStore((state) => state.createComponents);
  const setCreateComponentField = useCreateComponentsStore((state) => state.setCreateComponentField);
  const categories = useCategories();

  const initialValues: FormValues = {
    title: viewCreateComponentsStore.title,
    description: viewCreateComponentsStore.description,
    html: viewCreateComponentsStore.html,
    css: viewCreateComponentsStore.css,
    javascript: viewCreateComponentsStore.javascript,
    categories: viewCreateComponentsStore.categories,
    tags: viewCreateComponentsStore.tags,
    folder_name: viewCreateComponentsStore.folder_name,
  };

  const onSubmit = (values: FormValues) => {
    console.log('Form Values:', values);
    // Update Zustand store on form submit
    // setCreateComponentField(values);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
        >
          <span>Edit Components</span>
        </HoverBorderGradient>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-5xl">
        <Formik
          initialValues={initialValues}
          validationSchema={formSchema}
          onSubmit={onSubmit}
        >
          {({ values, handleChange, handleBlur, setFieldValue }) => {

            const onUpdate = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              const { name, value } = event.target;
            
              // Cast the name to the correct key type
              handleChange(event);
              setCreateComponentField(name as keyof CreateComponents, value);
              
              console.log('Updated Values:', {
                ...values,
                [name]: value,
              });
            };
            
            return (
              <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* {console.log(values)} */}
                <FormItem label="Title">
                  <Field name="title">
                    {({ field }: FieldProps<string>) => (
                      <Input
                        placeholder="Project Title"
                        {...field}
                        value={field.value}
                        onChange={onUpdate}
                        onBlur={handleBlur}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="title" component="p" />
                </FormItem>

                <FormItem label="Folder Name">
                  <Field name="folder_name">
                    {({ field }: FieldProps<string>) => (
                      <Input
                        placeholder="Folder Name"
                        {...field}
                        value={field.value}
                        onChange={onUpdate}
                        onBlur={handleBlur}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="folder_name" component="p" />
                </FormItem>

                <FormItem label="Description">
                  <Field name="description">
                    {({ field }: FieldProps<string>) => (
                      <Textarea
                        placeholder="Project description"
                        {...field}
                        value={field.value}
                        onChange={onUpdate}
                        onBlur={handleBlur}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="description" component="p" />
                </FormItem>

                <FormItem label="Tags">
                  <Field name="tags" component={MultiSelectField} options={tagsOptions} />
                  <ErrorMessage name="tags" component="p" />
                </FormItem>

                <FormItem label="Categories">
                  <Field name="categories">
                    {({ field }: FieldProps<string>) => (
                      <CnSelect
                        value={field.value}
                        onValueChange={(value) => {
                          setFieldValue(field.name, value);
                          setCreateComponentField(field.name as keyof CreateComponents, value);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {categories.map((category, index) => (
                              <SelectItem key={index} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </CnSelect>
                    )}
                  </Field>
                  <ErrorMessage name="categories" component="p" />
                </FormItem>
              </Form>
            )
          }}
        </Formik>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const FormItem = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="form-item">
    <label className="form-label">{label}</label>
    {children}
  </div>
);
